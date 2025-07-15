import express from "express";
import { getMessages } from "../controllers/chatController";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get("/", auth, getMessages);

export default router;