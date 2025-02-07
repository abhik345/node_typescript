import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/user.controller";

const router = Router();

router.get("/get-all", getAllUsers);
router.post("/create", createUser);

export default router;
