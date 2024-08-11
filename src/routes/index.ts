import { Router } from "express";
import adminRouter from "./admin";
import authRouter from "./authRoute";
import notebooksRouter from "./notebooksRoute";
const router = Router();

router.use("/notebooks", notebooksRouter);
router.use("/", authRouter);
router.use("/admin", adminRouter);

export default router;
