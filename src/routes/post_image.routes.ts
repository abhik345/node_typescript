import { Router } from "express";
import { createPostImage,getImagesByPostId,updateImageById,deleteImageById } from "../controllers/post_image.controller";
import { base64ToMultipleImages } from "../middleware/base64ToMultipleImages";
import { base64ToSingleImage } from "../middleware/base64ToSingleImage";


const router = Router();

router.post("/create",base64ToMultipleImages, createPostImage);
router.get("/get-all/:postId", getImagesByPostId);
router.put("/update/:id",base64ToSingleImage, updateImageById);
router.delete("/delete/:id", deleteImageById);

export default router;
