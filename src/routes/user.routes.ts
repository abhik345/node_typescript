import { Router } from "express";
import { getAllUsers, createUser,getUserById } from "../controllers/user.controller";

const router = Router();

router.get("/get-all", getAllUsers);
router.post("/create", createUser);
router.get("/get-all/:id", getUserById);

export default router;
