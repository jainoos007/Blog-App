import mongoose from "mongoose";
import Blog from "../Models/blog-model.js";
import User from "../Models/user-model.js";

//get all the blog posts || api/blog/
export const getAllBlogs = async (req, res) => {
  try {
    // Count total blogs for pagination info
    const total = await Blog.countDocuments();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || total; // default to total if limit is not provided
    const skip = (page - 1) * limit;

    // Find blogs with pagination and populate author
    const blogs = await Blog.find()
      .populate("author", "name email image") // populate author field with user details
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      blogs,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a blog post || api/blog/create
export const addBlog = async (req, res) => {
  const { title, description } = req.body;
  const author = req.user._id; // get user id from the request context
  const image = req.file ? req.file.filename : "";

  if (!title || !description) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  let existingUser;
  try {
    existingUser = await User.findById(author);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Unable to find user by this id" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }

  const newBlog = new Blog({ title, description, image, author });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log("Error saving blog to database", err);
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json({ message: "Created blog post successfully" });
};

//update blog by id || api/blog/update/:id
export const updateBlog = async (req, res) => {
  const { id } = req.params; // get blog post id from the URL
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null; // get image filename from the request

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    //update fieds if they are provided
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (image) blog.image = image; //update image filename

    await blog.save(); //save the updated blog post

    return res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get blog by id || api/blog/:id
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("author", "name email image"); // populate author field with user details
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json({ blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//delete blog by id || api/blog/delete/:id
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  let blog;
  try {
    blog = await Blog.findByIdAndDelete(id).populate("author");
    await blog.author.blogs.pull(blog);
    await blog.author.save();

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get blogs by user id || api/blog/user/:id
export const getBlogsByUserId = async (req, res) => {
  const { id } = req.params;

  let userBlogs;
  try {
    userBlogs = await User.findById(id).populate("blogs");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No blogs found for this user" });
  }
  return res.status(200).json({ blogs: userBlogs });
};
