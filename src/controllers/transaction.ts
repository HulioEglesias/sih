import { Request, Response } from "express";
import { PrismaClient, TransactionType } from "@prisma/client";
import { AuthRequest } from "../types";

const prisma = new PrismaClient();

const recalculateBalance = async (userId: string) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
  });

  const balance = transactions.reduce((acc, transaction) => {
    if (
      transaction.type === TransactionType.DEPOSIT ||
      transaction.type === TransactionType.SELL
    ) {
      return acc + transaction.value;
    } else {
      return acc - transaction.value;
    }
  }, 0);

  await prisma.user.update({
    where: { id: userId },
    data: { balance },
  });

  return balance;
};

export const buy = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const itemId = req.params.id;

  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item) {
    res.status(404).json({ error: "item not found" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ error: "user not found" });
    return;
  }
  const balance = await recalculateBalance(user.id);
  if (balance < item.price) {
    res.status(400).json({ error: "not enough money" });
    return;
  }

  if (item.ownerId) {
    await prisma.transaction.create({
      data: {
        type: TransactionType.SELL,
        value: item.price,
        userId: item.ownerId,
      },
    });
    await recalculateBalance(item.ownerId);
  }

  await prisma.transaction.create({
    data: {
      type: TransactionType.BUY,
      value: item.price,
      userId: user.id,
    },
  });
  const resultBalance = await recalculateBalance(user.id);

  res.json({ message: "success", resultBalance });
};

export const sell = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const itemId = req.params.id;

  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item) {
    res.status(404).json({ error: "item not found" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ error: "user not found" });
    return;
  }

  await prisma.transaction.create({
    data: {
      type: TransactionType.SELL,
      value: item.price,
      userId: user.id,
    },
  });

  const balance = await recalculateBalance(user.id);

  await prisma.item.update({
    where: { id: item.id },
    data: { ownerId: null },
  });

  res.json({ message: "success", balance });
};
