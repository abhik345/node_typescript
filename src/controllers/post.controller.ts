import { Request, Response } from "express";
import Post from "../models/post.model";
import User from "../models/user.model";  // ✅ Import User Model

// Create a new post
export const createPost = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
       res.status(400).json({ error: "All fields are required" });
    }

    const newPost = await Post.create({ title, content, userId });
     res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
     res.status(500).json({ error: "Error creating post" });
  }
};

// Get all posts (Include User Details)
export const getAllPosts = async (req: Request, res: Response) : Promise<void> => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: "user" }],
    });
     res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
     res.status(500).json({ error: "Error fetching posts" });
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{ model: User, as: "user" }],
    });

    if (!post) {
       res.status(404).json({ error: "Post not found" });
    }

     res.json(post);
  } catch (error) {
    console.error(" Error fetching post:", error);
     res.status(500).json({ error: "Error fetching post" });
  }
};



export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(" Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
};

