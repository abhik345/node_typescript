import { Request, Response } from "express";
import Post from "../models/post.model";
import User from "../models/user.model";
import  PostImage  from "../models/postImage.model";
import Comment from "../models/comments.model";

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, userId }: { title: string; content: string; userId: number } = req.body;

    if (!title || !content || !userId) {
      res.status(400).json({ status : 400,message: "All fields are required" });
    }

    const newPost = await Post.create({ title, content, userId });
    res.status(201).json({
      status: "201",
      message: "Post created successfully",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

// Get all posts (Include User Details)
export const getAllPosts = async (req: Request, res: Response) : Promise<void> => {
  try {
    const posts: Post[] = await Post.findAll({
      attributes : ["id", "title", "content"],
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        {
          model: PostImage,
          as: "postImages",
          attributes: ["id", "imageUrl"],
        },
      ],
    });
    
    if(posts.length === 0){
       res.status(404).json({ error: "No posts found" });
    }
    res.status(200).json({
      status: "200",
      message: "Posts fetched successfully",
      data: posts
    })
  } catch (error) {
    console.error("Error fetching posts:", error);
     res.status(500).json({ error: "Error fetching posts" });
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const post : Post | null = await Post.findByPk(id, {
      attributes: ["id", "title", "content"],
      include: [{ model: User, as: "user", attributes: ["id","name","email"] },{
        model: PostImage,
        as: "postImages",
        attributes: ["id", "imageUrl"],
      },{
        model : Comment,
        as : "comments",
        attributes: ["id", "content"],
      }],
    });

    if (!post) {
       res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({
      status: "200",
      message: "Post fetched successfully",
      data: post
    })
  } catch (error) {
    console.error(" Error fetching post:", error);
     res.status(500).json({ error: "Error fetching post" });
  }
};


export const updatePost = async (
  req: Request<{ id: string }, {}, { title?: string; content?: string; userId?: number }>,
  res: Response<{ status: number; message: string; data?: Post }>
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, userId } = req.body;

    const post: Post | null = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({
        status: 404,
        message: "Post not found",
      });
      return;
    }

    // Update only if values are provided
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (userId !== undefined) post.userId = userId;

    await post.save();

    res.status(200).json({
      status: 200,
      message: "Post updated successfully",
      data: post, // Now allowed in the response type
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};




export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post : Post | null = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    await post.destroy();
    res.status(200).json({ status : 200, message: "Post deleted successfully" });
  } catch (error : any) {
    res.status(500).json({ status : 500, error: error.message });
  }
};

