import express from "express";
import { getAllBlogs } from "../Controllers/blog-controller.js";

const router = express.Router();

router.get("/", getAllBlogs);

export default router;
