import express from "express";
import { addBlog, getAllBlogs } from "../Controllers/blog-controller.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", addBlog);

export default router;
