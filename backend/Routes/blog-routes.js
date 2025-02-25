import express from "express";
import {
  addBlog,
  getAllBlogs,
  updateBlog,
} from "../Controllers/blog-controller.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", addBlog);
router.patch("/update/:id", updateBlog);

export default router;
