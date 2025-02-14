import { Router } from "express";
import {createComment,getComments} from "../controllers/comment.controller"


const router = Router();

router.post("/create", createComment);
router.get("/get-all", getComments);


export default router;


