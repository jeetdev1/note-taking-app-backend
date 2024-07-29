import { Request, Response, Router } from "express";
import { createNote, getAllNotes } from "../controllers/notesController";
const router = Router();

router.get("/", getAllNotes);
router.post("/create", createNote);

export default router;
