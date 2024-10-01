import Joi from "joi";

const loginValidator = Joi.string().min(3).max(25).required().messages({
  "string.base": "Логин должен быть строкой.",
  "string.empty": "Логин не может быть пустым.",
  "string.min": "Логин должен содержать минимум 3 символа.",
  "string.max": "Логин не должен превышать 30 символов.",
  "any.required": "Логин обязателен.",
});
const passwordValidator = Joi.string().min(3).max(25).required().messages({
  "string.base": "Пароль должен быть строкой.",
  "string.empty": "Пароль не может быть пустым.",
  "string.min": "Пароль должен содержать минимум 6 символов.",
  "string.max": "Пароль не должен превышать 50 символов.",
  "any.required": "Пароль обязателен.",
});

export const registerSchema = Joi.object({
  login: loginValidator,
  password: passwordValidator,
});

export const loginSchema = Joi.object({
  login: loginValidator,
  password: passwordValidator,
});
