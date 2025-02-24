import { Request, Response } from "express";
import User from "../models/user.model";
import Comment from "../models/comments.model";

/**
 * Fetch all users.
 * 
 * @param _req - Express request object (unused)
 * @param res - Express response object
 * @returns Promise<void> - Resolves with a JSON response of all users or an error message
 */
export const getAllUsers = async (_req: Request, res: Response<{ status: string, message: string, data?: User[]}>): Promise<void> => {
  try {
    const users: User[] = await User.findAll();
    res.status(200).json({
      status: "200",
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error : any) {
    res.status(500).json({ 
      status : "500",
      message : error.message
     });
  }
};

/**
 * Creates a new user.
 * 
 * @param req - Express request object with strongly typed request body
 * @param res - Express response object
 * @returns Promise<void> - Resolves with a JSON response of the created user or an error message
 */
export const createUser = async (
  req: Request<{}, {}, { name: string, email: string, password: string }>,
  res: Response<{ status: string, message: string }>,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ 
        status : "400",
        message : "All fields are required"
       });
      return;
    }
    const newUser = await User.create({ name, email, password });
    res.status(201).json({
      status: "201",
      message: "User created successfully",
    });
  } catch (error : any) {
    res.status(500).json({ 
      status : "500",
      message  : error.message
     });
  }
};


export const getUserById = async (req: Request,res:Response) :Promise<void> =>{

  try {
    const {id} = req.params;
    const user : User | null = await User.findByPk(id, {
      include : [
        {
          model : Comment,
          as : "comments",
          attributes : ["id","content"]
        }
      ]
    });
    if(!user){
      res.status(404).json({
        status : "404",
        message : "User not found"
      })
      return;
    }

    res.status(200).json({
      status : "200",
      message : "User fetched successfully",
      data : user
    })
  } catch (error : any) {
    res.status(500).json({ 
      status : "500",
      message : error.message
     });
  }
  
}


export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: User | null = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        status: "404",
        message: "User not found",
      });
      return;
    }
    await user.destroy();
    res.status(200).json({
      status: "200",
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};
