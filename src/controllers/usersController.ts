import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";
import UserModel from "../models/userModel";
import ApiError from "../utils/ApiError";
import { formatZodErrors } from "../utils/helpers";

const User = new UserModel();

export const createUser = async (req: Request, res: Response) => {
  const userSchema = z.object({
    first_name: z
      .string({ message: "This is a required field" })
      .min(1, { message: "This is a required field" }),
    last_name: z
      .string({ message: "This is a required field" })
      .min(1, { message: "This is a required field" }),
    email: z
      .string({ message: "This is a required field" })
      .email()
      .min(1, { message: "This is a required field" }),
    password: z
      .string({ message: "This is a required field" })
      .min(1, { message: "This is a required field" })
      .min(8)
      .max(24),
  });
  const parsedBody = userSchema.safeParse({ ...req.body });
  if (!parsedBody.success) {
    let errorDetails: unknown = [];
    if (parsedBody?.error?.issues) {
      errorDetails = formatZodErrors(parsedBody.error.issues);
    }
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST,
      undefined,
      errorDetails
    );
  }
  const duplicateEmailExists = await User.validateUserDuplicateEmail(
    parsedBody.data.email
  );
  if (!duplicateEmailExists) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Email already taken");
  }
  const data = { ...parsedBody.data };
  const password = await bcrypt.hash(
    data.password,
    Number(process.env.PASSWORD_SALT_ROUND)
  );
  const payload = { ...data, password: password };
  const createdData = await User.create(payload);
  res.status(StatusCodes.CREATED).json({
    id: createdData.rows[0].id,
    message: ReasonPhrases.CREATED,
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.fetchAll(
    ["id", "first_name", "last_name", "email", "created_at", "updated_at"],
    req.query
  );
  res.status(200).json({ length: users.rowCount, users: users.rows });
};

export const updateUser = async (req: Request, res: Response) => {
  const userSchema = z.object({
    first_name: z
      .string({ message: "This is a required field" })
      .min(1, { message: "This is a required field" }),
    last_name: z
      .string({ message: "This is a required field" })
      .min(1, { message: "This is a required field" }),
  });
  const parsedBody = userSchema.safeParse({ ...req.body });
  if (!parsedBody.success) {
    let errorDetails: unknown = [];
    if (parsedBody?.error?.issues) {
      errorDetails = formatZodErrors(parsedBody.error.issues);
    }
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      ReasonPhrases.BAD_REQUEST,
      undefined,
      errorDetails
    );
  }
  const data = await User.updateById(Number(req.params.id), parsedBody.data);
  res.status(StatusCodes.OK).json({
    user: data.rows[0],
  });
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (isNaN(Number(id))) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Id");
  }
  const userData = await User.findById(id, [
    "id",
    "first_name",
    "last_name",
    "email",
    "created_at",
    "updated_at",
  ]);
  res.status(StatusCodes.OK).json({
    user: userData.rows[0],
  });
};
