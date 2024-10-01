"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("./../middlewares/validate");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../validators/auth");
const router = express_1.default.Router();
router.post("/register", (0, validate_1.validate)(auth_2.registerSchema), auth_1.register);
router.post("/login", (0, validate_1.validate)(auth_2.loginSchema), auth_1.login);
exports.default = router;
