import express from "express";
import {
  deleteUserById,
  getAllUsers,
  login,
  signup,
  updateUserById,
} from "../Controllers/user-controller.js";
import { getAllBlogs, getBlogById } from "../Controllers/blog-controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.put("/update/:id", upload.single("image"), updateUserById);
router.delete("/delete/:id", deleteUserById);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlogById); //get blog by blog ID

export default router;
