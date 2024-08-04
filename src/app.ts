import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { pool } from "./db";
import router from "./routes/index";
dotenv.config({ path: ".env" });

const app: Express = express();

app.use(morgan("tiny"));

app.use(express.json());

pool.on("connect", () => {
  console.log("DB connected");
});

pool.on("error", () => {
  console.log("db disconnected");
});

app.use("/v1", router);
app.use(function (req: Request, res: Response) {
  res.status(404).json({
    status: "error",
    message: "Path not found",
  });
});

export default app;
