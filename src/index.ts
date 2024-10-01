import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";
import { port } from "./config";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Случаются и ошибочки");
});

const PORT = port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
