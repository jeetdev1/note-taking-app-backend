import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "../controllers/notebooksController";
import { handleAsync } from "../utils/handleAsync";
const router = Router();

router.get("/", handleAsync(getAllNotes));
router.get("/:id", handleAsync(getSingleNote));
router.post("/create", handleAsync(createNote));
router.patch("/:id", handleAsync(updateNote));
router.delete("/:id", handleAsync(deleteNote));

export default router;
