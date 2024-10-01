import { validate } from "./../middlewares/validate";
import express from "express";
import { register, login } from "../controllers/auth";
import { loginSchema, registerSchema } from "../validators/auth";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
