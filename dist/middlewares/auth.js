"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        req.user = jsonwebtoken_1.default.verify(token, config_1.secret);
        next();
    }
    catch (error) {
        res.sendStatus(403).json({ error: "unauthorized" });
    }
};
exports.authenticateToken = authenticateToken;
