"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const loginValidator = joi_1.default.string().min(3).max(25).required().messages({
    "string.base": "Логин должен быть строкой.",
    "string.empty": "Логин не может быть пустым.",
    "string.min": "Логин должен содержать минимум 3 символа.",
    "string.max": "Логин не должен превышать 30 символов.",
    "any.required": "Логин обязателен.",
});
const passwordValidator = joi_1.default.string().min(3).max(25).required().messages({
    "string.base": "Пароль должен быть строкой.",
    "string.empty": "Пароль не может быть пустым.",
    "string.min": "Пароль должен содержать минимум 6 символов.",
    "string.max": "Пароль не должен превышать 50 символов.",
    "any.required": "Пароль обязателен.",
});
exports.registerSchema = joi_1.default.object({
    login: loginValidator,
    password: passwordValidator,
});
exports.loginSchema = joi_1.default.object({
    login: loginValidator,
    password: passwordValidator,
});
