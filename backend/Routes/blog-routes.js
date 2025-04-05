import express from "express";
import {
  addBlog,
  deleteBlog,
  getBlogsByUserId,
  updateBlog,
} from "../Controllers/blog-controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

//apply authmiddleware to all routes
router.use(verifyToken);

router.post("/create", upload.single("image"), addBlog);
router.put("/update/:id", upload.single("image"), updateBlog);
router.delete("/delete/:id", deleteBlog);
router.get("/user/:id", getBlogsByUserId);

export default router;
