import { Router } from "express";
import userRouter from "./usersRoute";
const adminRouter = Router();

adminRouter.use("/users", userRouter);

export default adminRouter;
