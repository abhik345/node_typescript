import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to convert multiple base64 images to files and store them.
 * Supports a maximum of 5 images.
 */
export const base64ToMultipleImages = async (req: Request, res: Response, next: NextFunction) => {
    const { image_urls } = req.body;

    if (!image_urls || !Array.isArray(image_urls)) {
        return next();
    }

    // Limit uploads to max 5 images
    const imagesToProcess = image_urls.slice(0, 5);

    try {
        const uploadsDir = path.join(__dirname, "..", "uploads");

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const processedImages = await Promise.all(
            imagesToProcess.map(async (image_url, index) => {
                if (!image_url) return null;

                const matches = image_url.match(/^data:image\/([A-Za-z-+]+);base64,(.+)$/);
                if (!matches || matches.length !== 3) return null;

                const [, imageType, imageData] = matches;
                const imageBuffer = Buffer.from(imageData, "base64");
                const imageName = `image-${Date.now()}-${index}.${imageType}`;
                const imagePath = path.join(uploadsDir, imageName);

                await fs.promises.writeFile(imagePath, imageBuffer);

                return `/uploads/${imageName}`;
            })
        );

        // Filter out null values (invalid images)
        req.body.image_urls = processedImages.filter((img) => img !== null);
        next();
    } catch (error: any) {
        res.status(500).json({ error: `Error processing images: ${error.message}` });
    }
};
