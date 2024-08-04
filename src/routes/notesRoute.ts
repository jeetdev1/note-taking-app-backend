import { Request, Response, Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controllers/notesController";
const router = Router();

router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.post("/create", createNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
