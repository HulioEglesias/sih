import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const get = async (req: Request, res: Response) => {
  const items = await prisma.item.findMany();
  res.json(items);
};

export const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await prisma.item.findUnique({ where: { id } });
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "item not found" });
  }
};

export const create = async (req: Request, res: Response) => {
  const { title, price } = req.body;
  try {
    const item = await prisma.item.create({
      data: { title, price },
    });
    res.status(201).json(item);
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};
