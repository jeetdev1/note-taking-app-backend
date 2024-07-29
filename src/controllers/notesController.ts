import { Request, Response } from "express";
import Note from "../models/notesModel";
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const data = await Note.find({}).select(["title", "body"]);
    res.status(200).json({
      notes: data,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "No notes found",
    });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const data = await Note.create(body);
    res.status(201).json({
      note: data,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Note not created",
    });
  }
};
