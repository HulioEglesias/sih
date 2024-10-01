"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sell = exports.buy = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const recalculateBalance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield prisma.transaction.findMany({
        where: { userId },
    });
    const balance = transactions.reduce((acc, transaction) => {
        if (transaction.type === client_1.TransactionType.DEPOSIT ||
            transaction.type === client_1.TransactionType.SELL) {
            return acc + transaction.value;
        }
        else {
            return acc - transaction.value;
        }
    }, 0);
    yield prisma.user.update({
        where: { id: userId },
        data: { balance },
    });
    return balance;
});
const buy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const itemId = req.params.id;
    const item = yield prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
        res.status(404).json({ error: "item not found" });
        return;
    }
    const user = yield prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        res.status(404).json({ error: "user not found" });
        return;
    }
    const balance = yield recalculateBalance(user.id);
    if (balance < item.price) {
        res.status(400).json({ error: "not enough money" });
        return;
    }
    if (item.ownerId) {
        yield prisma.transaction.create({
            data: {
                type: client_1.TransactionType.SELL,
                value: item.price,
                userId: item.ownerId,
            },
        });
        yield recalculateBalance(item.ownerId);
    }
    yield prisma.transaction.create({
        data: {
            type: client_1.TransactionType.BUY,
            value: item.price,
            userId: user.id,
        },
    });
    const resultBalance = yield recalculateBalance(user.id);
    res.json({ message: "success", resultBalance });
});
exports.buy = buy;
const sell = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const itemId = req.params.id;
    const item = yield prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
        res.status(404).json({ error: "item not found" });
        return;
    }
    const user = yield prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        res.status(404).json({ error: "user not found" });
        return;
    }
    yield prisma.transaction.create({
        data: {
            type: client_1.TransactionType.SELL,
            value: item.price,
            userId: user.id,
        },
    });
    const balance = yield recalculateBalance(user.id);
    yield prisma.item.update({
        where: { id: item.id },
        data: { ownerId: null },
    });
    res.json({ message: "success", balance });
});
exports.sell = sell;
