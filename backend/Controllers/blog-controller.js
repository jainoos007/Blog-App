import mongoose from "mongoose";
import Blog from "../Models/blog-model.js";
import User from "../Models/user-model.js";

//get all the blog posts || api/blog/
export const getAllBlogs = async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    console.error(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No blog posts found" });
  }
  return res.json({ blogs });
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
  const { title, description, image, author } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, image, author },
      { new: true }
    ); // update the blog post
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get blog by id || api/blog/:id
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
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
