import dotenv from "dotenv";
import express, {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import morgan from "morgan";
import { pool } from "./db";
import { converErrors, handleError } from "./middlewares/error";
import router from "./routes/index";
import ApiError from "./utils/ApiError";
dotenv.config({ path: ".env" });

const app: Express = express();

app.use(morgan("tiny"));

app.use(express.json());

// pool.on("connect", () => {
//   console.log("DB connected");
// });

pool.on("error", () => {
  console.log("DB disconnected");
});

app.use("/v1", router);
app.use(function (req: Request, res: Response) {
  res.status(404).json({
    status: "error",
    message: "Path not found",
  });
});

app.use(converErrors);
app.use(handleError);

export default app;
