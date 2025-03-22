import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByUserId,
  updateBlog,
} from "../Controllers/blog-controller.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", addBlog);
router.get("/:id", getBlogById);
router.patch("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);
router.get("/user/:id", getBlogsByUserId);

export default router;
