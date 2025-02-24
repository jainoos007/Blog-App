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
