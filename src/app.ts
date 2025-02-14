import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import postImageRoutes from "./routes/post_image.routes";
import commentRoutes from "./routes/comment.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v2/users", userRoutes);
app.use("/api/v2/posts", postRoutes);
app.use("/api/v2/post-image", postImageRoutes);
app.use("/api/v2/comments", commentRoutes);

app.use(errorHandler);

export default app;
