import { Router } from "express";
import { createPostImage } from "../controllers/post_image.controller";
import { base64ToMultipleImages } from "../middleware/base64ToMultipleImages";


const router = Router();

router.post("/create",base64ToMultipleImages, createPostImage);

export default router;
