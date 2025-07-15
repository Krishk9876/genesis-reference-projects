import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", chatRoutes);

mongoose.connect(process.env.MONGO_URI || "", {})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

export default app;