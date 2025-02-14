import { Router } from "express";
import {createComment,getComments} from "../controllers/comment.controller"


const router = Router();

router.post("/create", createComment);
// router.get("/get-all-user/:userId", getCommentsByUser);
// router.get("/get-all-post/:postId", getCommentsByPost);
router.get("/get-all", getComments);


export default router;


