import Blog from "../Models/blog-model.js";

//get all the blog posts
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

//create a blog post
export const addBlog = async (req, res) => {
  try {
    const { title, description, image, author } = req.body;

    const newBlog = new Blog({ title, description, image, author });

    try {
      await newBlog.save();
    } catch (err) {
      console.log("Error saving blog to database", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Created blog post successfully" });
  } catch (err) {
    console.log("Error creating blog", err);
    return res.status(404).json({ message: "internal server error" });
  }
};
