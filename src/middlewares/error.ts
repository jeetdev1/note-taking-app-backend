import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";

export const converErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode: number = error?.statusCode
      ? Number(error.statusCode)
      : StatusCodes.BAD_REQUEST;
    const message: string = error?.message
      ? String(error.message)
      : ReasonPhrases.BAD_REQUEST;
    const code = error.code ? error.code : "";
    error = new ApiError(
      statusCode,
      message,
      code,
      undefined,
      false,
      error.stack
    );
  }
  next(error);
};

export const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode;
  let message = err.message;
  if (err.isOperational) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = ReasonPhrases.INTERNAL_SERVER_ERROR;
  }
  let response: {
    message: string;
    stack?: string;
    details?: unknown;
  } = {
    message: message,
  };
  if (err.details) {
    response.details = err.details;
  }
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }
  res.status(statusCode).send(response);
};
