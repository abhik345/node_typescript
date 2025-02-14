import { Router } from "express";
import {createComment,getCommentsByUser} from "../controllers/comment.controller"


const router = Router();

router.post("/create", createComment);
router.get("/get-all-user/:userId", getCommentsByUser);

export default router;


