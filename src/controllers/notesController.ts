import { Request, Response } from "express";
import NoteModel from "../models/notesModel";

const Note = new NoteModel();
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const data = await Note.fetchAll();
    res.status(200).json({
      length: data?.rowCount,
      notes: data?.rows,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "No notes found",
    });
  }
};
export const getSingleNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Note.findById(id);
    res.status(200).json({
      note: data?.rows[0],
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "No note found",
    });
  }
};
export const createNote = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const data = await Note.save(body.title, body.body);
    res.status(201).json({ note: data?.rows[0] });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Note not created",
    });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const body = { title: String(req.body.title), body: String(req.body.body) };
    const id = req.params.id;
    const data = await Note.updateOne(id, body);
    res.status(200).json({
      note: {
        id: data?.rows[0].id,
        title: data?.rows[0].title,
        body: data?.rows[0].body,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Note not created",
    });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Note.deleteOne(id);
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Note not created",
    });
  }
};
