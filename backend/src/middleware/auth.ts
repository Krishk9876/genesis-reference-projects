import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: string };
    // @ts-ignore
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};