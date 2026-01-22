import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import { AppError } from "../utils/appError";

// Global error handler middleware
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const isDevelopment = config.node_environment === "development";

  // AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: false,
      statusCode: err.statusCode,
      message: err.message,
      ...(isDevelopment && err.details && { details: err.details }),
    });
  }

  // ZodError
  if (err instanceof ZodError) {
    const formattedErrors = err.issues
      .map((item) => `${item.path.join(".")} - ${item.message}`)
      .join(", ");

    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Zod Validation Error!",
      errors: formattedErrors,
    });
  }

  // Fallback
  return res.status(500).json({
    status: false,
    statusCode: 500,
    message: isDevelopment
      ? "An unexpected error occurred. Please check the server logs."
      : "Something went wrong. Please try again later.",
  });
};

export default globalErrorHandler;
