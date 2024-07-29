import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import router from "./routes/index";
const app: Express = express();

app.use(morgan("tiny"));

app.use(express.json());

app.use("/v1", router);
app.use(function (req: Request, res: Response) {
  res.status(404).json({
    status: "error",
    message: "Path not found",
  });
});

export default app;
