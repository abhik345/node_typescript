import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to convert a base64 image to a file and store it.
 * Updates the `imageUrl` property of the request body with the URL of the uploaded image.
 */
export const base64ToSingleImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return next();
  }

  const matches = imageUrl.match(/^data:image\/([A-Za-z-+]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    res.status(400).json({ error: "Invalid base64 image format" });
    return;
  }

  const [, imageType, imageData] = matches;
  const imageBuffer = Buffer.from(imageData, "base64");

  const uploadsDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const imageName = `image-${Date.now()}.${imageType}`;
  const imagePath = path.join(uploadsDir, imageName);
  try {
    await fs.promises.writeFile(imagePath, imageBuffer);
    req.body.imageUrl = `/uploads/${imageName}`;
    next();
  } catch {
    res.status(500).json({ error: "Error processing image" });
  }
};
