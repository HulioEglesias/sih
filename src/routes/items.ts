import express from "express";
import * as itemController from "../controllers/item";
import { authenticateToken } from "../middlewares/auth";
import * as transactionController from "../controllers/transaction";

const router = express.Router();

router.get("/", itemController.get);
router.get("/:id", itemController.getOneById);
router.post("/", itemController.create);

router.post("/:id/buy", authenticateToken, transactionController.buy);
router.post("/:id/sell", authenticateToken, transactionController.sell);

export default router;
