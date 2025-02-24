import express from "express";
import { createPost, deletePost, updatePost } from "../controllers/postController";
import { upload } from "../middleware/multipleImages";


const router = express.Router();
router.route("/create-post/:userId").post(upload, createPost);
router.route("/update-post/:postId/:userId").patch(upload, updatePost)
router.route("/delete-post/:postId/:userId").delete(deletePost)


export default router