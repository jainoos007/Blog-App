import express from "express";
import {
  getAllUsers,
  login,
  signup,
  updateUserById,
} from "../Controllers/user-controller.js";
import { getAllBlogs, getBlogById } from "../Controllers/blog-controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.put("/update/:id", updateUserById);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);

export default router;
