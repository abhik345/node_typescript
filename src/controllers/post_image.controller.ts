import { Request, Response } from "express";
import PostImage from "../models/postImage.model";

export const createPostImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { postId, image_urls }: { postId: number; image_urls: string[] } = req.body;
        if (!postId || !image_urls || image_urls.length === 0) {
            res.status(400).json({ status: 400, message: "postId and at least one image are required" });
            return;
        }
        const imagesToInsert = image_urls.slice(0, 5).map((imageUrl) => ({
            postId,
            imageUrl,
        }));
        await PostImage.bulkCreate(imagesToInsert);
        res.status(201).json({
            status: "201",
            message: `${imagesToInsert.length} Post Images created successfully`,
        });
    } catch (error: any) {
        res.status(500).json({ status: 500, message: error.message });
    }
};
