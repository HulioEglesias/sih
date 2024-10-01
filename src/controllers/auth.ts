import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../config";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ id: user.id }, secret);
    res.json({ token });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: "Already exists" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { login },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, secret);
    res.json({ token });
  } else {
    res.status(400).json({ error: "Wrong login or password" });
  }
};
