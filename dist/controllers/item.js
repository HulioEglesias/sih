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
exports.create = exports.getOneById = exports.get = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield prisma.item.findMany();
    res.json(items);
});
exports.get = get;
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const item = yield prisma.item.findUnique({ where: { id } });
    if (item) {
        res.json(item);
    }
    else {
        res.status(404).json({ error: "item not found" });
    }
});
exports.getOneById = getOneById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, price } = req.body;
    try {
        const item = yield prisma.item.create({
            data: { title, price },
        });
        res.status(201).json(item);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
});
exports.create = create;
