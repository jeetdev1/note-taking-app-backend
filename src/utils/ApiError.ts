class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code: string;
  public details: unknown;
  constructor(
    statusCode: number,
    message: string,
    code?: string,
    details?: unknown,
    isOperational?: boolean,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational ? isOperational : false;
    this.code = code || "";
    this.details = details;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;
