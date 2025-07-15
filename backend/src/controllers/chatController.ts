import { Request, Response } from "express";
import Message from "../models/Message";

// Get all messages
export const getMessages = async (_req: Request, res: Response) => {
  const messages = await Message.find().populate('sender', 'username');
  res.json(messages);
};