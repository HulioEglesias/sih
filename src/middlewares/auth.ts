import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../config";
import { AuthRequest, AuthUser } from "../types";
import { User } from "@prisma/client";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    req.user = jwt.verify(token, secret) as AuthUser;
    next();
  } catch (error) {
    res.sendStatus(403).json({ error: "unauthorized" });
  }
};
