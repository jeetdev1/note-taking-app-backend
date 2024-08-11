import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import NoteModel from "../models/notebookModel";
import ApiError from "../utils/ApiError";

const Note = new NoteModel();
export const getAllNotes = async (req: Request, res: Response) => {
  const query = req.query;
  const data = await Note.fetchAll(["*"], query);
  res.status(200).json({
    length: data?.rowCount,
    notes: data?.rows,
  });
};
export const getSingleNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await Note.findById(id);
  if (data.rowCount === 0) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Note ${ReasonPhrases.NOT_FOUND}`
    );
  }
  res.status(200).json({
    note: data?.rows[0],
  });
};
export const createNote = async (req: Request, res: Response) => {
  const body = req.body;
  const data = await Note.save(body.title, body.body);
  res.status(201).json({ note: data?.rows[0] });
};

export const updateNote = async (req: Request, res: Response) => {
  const body = { title: String(req.body.title), body: String(req.body.body) };
  const id = req.params.id;
  const note = await Note.findById(id);
  if (note.rowCount === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Note not found");
  }
  const data = await Note.updateOne(id, body);
  res.status(200).json({
    note: {
      id: data?.rows[0].id,
      title: data?.rows[0].title,
      body: data?.rows[0].body,
    },
  });
};

export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Note.deleteOne(id);
  res.status(204).json({});
};
