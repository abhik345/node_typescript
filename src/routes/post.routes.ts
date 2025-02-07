import { Router } from "express";
import { createPost, getAllPosts, getPostById, deletePost,updatePost } from "../controllers/post.controller";

const router = Router();

router.post("/create", createPost); 
router.get("/get-all", getAllPosts); 
router.put("/update/:id", updatePost); 
router.get("/get-all/:id", getPostById); 
router.delete("/delete/:id", deletePost);

export default router;
