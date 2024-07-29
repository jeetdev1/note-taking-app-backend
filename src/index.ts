import dotenv from "dotenv";
import * as mongoose from "mongoose";
import app from "./app";

dotenv.config();

const dbUrl = process.env
  .DB!.replace("<USERNAME>", process.env.DB_USERNAME!)
  .replace("<PASSWORD>", process.env.DB_PASSWORD!);

mongoose.connect(dbUrl).then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port);
});
