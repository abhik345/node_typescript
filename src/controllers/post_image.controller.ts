import { Request, Response } from "express";
import PostImage from "../models/postImage.model";

/**
 * Creates one or more Post Images for a given post.
 * Expects a JSON body with a postId and an array of image_urls.
 * Supports a maximum of 5 images.
 * @param req - Express request object with strongly typed request body.
 * @param res - Express response object.
 * @returns Promise<void> - Resolves with a JSON response of the created Post Image(s) or an error message.
 */
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

interface PostIdParams {
    postId: number;
}

/**
 * Fetch all Post Images for a given post.
 * @param req - Express request object with a params object containing a postId.
 * @param res - Express response object.
 * @returns Promise<void> - Resolves with a JSON response of the images or an error message.
 */
export const getImagesByPostId = async (req: Request<PostIdParams>, res: Response): Promise<void> => {
    try {
        const { postId } = req.params;
        const images : PostImage[] = await PostImage.findAll({
            where: {postId}
        })
        if (images.length === 0) {
            res.status(404).json({ status: 404, message: "No images found" });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Images fetched successfully",
            data: images
        })
    } catch (error : any) {
        res.status(500).json({ status: 500, message: error.message });
    }

}


/**
 * Updates a single image by its id.
 *
 * @param req - Express request object with strongly typed request body and params.
 * @param res - Express response object.
 * @returns Promise<void> - Resolves with a JSON response of the updated image or an error message.
 */
export const updateImageById = async (
    req: Request<{ id: string }, {}, { imageUrl?: string, postId: string }>,
    res: Response<{ status: number, message: string, data?: PostImage }>,
): Promise<void> => {
    try {
        const { id } = req.params;
        const { imageUrl, postId } = req.body;
        const image: PostImage | null = await PostImage.findOne({
            where: { id: Number(id), postId: Number(postId) },
        });
        if (!image) {
            res.status(404).json({
                status: 404,
                message: "Post not found",
            });
            return;
        }
        if (imageUrl) {
            image.imageUrl = imageUrl;
        }

        await image.save();
        res.status(200).json({
            status: 200,
            message: "Image updated successfully",
            data: image,
        });
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}


/**
 * Deletes a single image by its id.
 *
 * @param req - Express request object with a params object containing an image id.
 * @param res - Express response object.
 * @returns Promise<void> - Resolves with a JSON response of the deleted image or an error message.
 */
export const deleteImageById = async (req : Request,res: Response) : Promise<void> => {
    try {
        const {id} = req.params;
        const image : PostImage | null = await PostImage.findByPk(id);
        if (!image) {
            res.status(404).json({ status: 404, message: "Image not found" });
            return;
        }
        await image.destroy();
        res.status(200).json({ status: 200, message: "Image deleted successfully" });
    } catch (error : any) {
        res.status(500).json({ status: 500, message: error.message });
    }

}

