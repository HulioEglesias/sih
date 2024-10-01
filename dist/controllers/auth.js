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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const user = yield prisma.user.create({
            data: {
                login,
                password: hashedPassword,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.secret);
        res.json({ token });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(400).json({ error: "Already exists" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: { login },
    });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.secret);
        res.json({ token });
    }
    else {
        res.status(400).json({ error: "Wrong login or password" });
    }
});
exports.login = login;
