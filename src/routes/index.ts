import { Router } from "express";
import notesRouter from "./notesRoute";

const router = Router();

router.use("/notes", notesRouter);

export default router;
