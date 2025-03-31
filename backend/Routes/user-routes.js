import express from "express";
import { getAllUsers, login, signup } from "../Controllers/user-controller.js";
import { getAllBlogs } from "../Controllers/blog-controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.get("/blogs", getAllBlogs);

export default router;
