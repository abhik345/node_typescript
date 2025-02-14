import { Request, Response } from "express";
import Comment from "../models/comments.model";
import User from "../models/user.model";
import Post from "../models/post.model";

/**
 * Creates a new comment.
 * @param req - Express request object with strongly typed request body.
 * @param res - Express response object.
 * @returns Promise<void> - Resolves with a JSON response of the created comment or an error message.
 */
export const createComment = async (
  req: Request<{ content: string; userId: number; postId: number }>,
  res: Response<{ status: number; message: string }>
): Promise<void> => {
  try {
    const { content, userId, postId } = req.body;

    if (!content || !userId || !postId) {
      res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
      return;
    }
    await Comment.create({ content, userId, postId });

    res.status(201).json({
      status: 201,
      message: "Comment created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export const getCommentsByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const comments: Comment[] = await Comment.findAll({
      where: {
        userId,
      },
      attributes: ["id", "content"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Post,
          as: "post",
          attributes: ["id", "title", "content"],
        },
      ],
    });
    if (comments.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No comments found",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
