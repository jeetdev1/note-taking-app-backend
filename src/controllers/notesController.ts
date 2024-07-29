import { Request, Response } from "express";

export const getAllNotes = (req: Request, res: Response) => {
  res.status(200).json({
    notes: [],
  });
};

export const createNote = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({
    note: {},
  });
};
