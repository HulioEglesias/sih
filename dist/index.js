"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const items_1 = __importDefault(require("./routes/items"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/items", items_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Случаются и ошибочки");
});
const PORT = config_1.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
