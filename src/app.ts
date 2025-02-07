import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes"
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v2/users", userRoutes);
app.use("/api/v2/posts", postRoutes);

app.use(errorHandler);

export default app;
