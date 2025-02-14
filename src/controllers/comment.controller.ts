import {Request, Response} from "express";
import Comment from "../models/comments.model";



export const createComment = async (req :Request,res : Response) : Promise<void> => {
    try {
        const {content, userId,postId} : {
            content : string;
            userId : number;
            postId : number;
        } = req.body;

        if(!content || !userId || !postId){
            res.status(400).json({
                status: 400,
                message: "All fields are required" ,
            })
            return;
        }
        await Comment.create({content,userId,postId});

        res.status(201).json({
            status: 201,
            message: "Comment created successfully",
        });
    } catch (error : any) {
        res.status(500).json({status: 500, message: error.message});
    }
}