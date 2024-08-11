import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { z } from "zod";
import AuthModel from "../models/authModel";
import ApiError from "../utils/ApiError";
import { formatZodErrors } from "../utils/helpers";

const Auth = new AuthModel();

export const login = async (req: Request, res: Response) => {
  const loginSchema = z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password Is required" }),
  });
  const parsedBody = loginSchema.safeParse({ ...req.body });
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
  const userData = await Auth.getUser(parsedBody.data.email);
  if (userData.length !== 1) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
  }
  const user = userData[0];
  const isValidPassword = await bcrypt.compare(
    parsedBody.data.password,
    user.password
  );
  if (!isValidPassword) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
  }
  res.status(StatusCodes.OK).json({
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
  });
};
