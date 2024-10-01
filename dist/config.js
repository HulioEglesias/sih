"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = exports.port = void 0;
const { SECRET_JWT_KEY, PORT } = process.env;
exports.port = PORT || 3000;
exports.secret = SECRET_JWT_KEY || "secret";
