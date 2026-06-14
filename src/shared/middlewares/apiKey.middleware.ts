import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../lib/utils/response.js";

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const apiKey = req.headers["x-api-key"];
  const validApiKey = process.env.API_KEY;

  if (!validApiKey) {
    // If the server doesn't have an API_KEY configured, it's a server error
    // but in development we might want to bypass it. For production, enforce it.
    console.warn("API_KEY environment variable is not configured.");
  }

  if (!apiKey || apiKey !== validApiKey) {
    errorResponse({
      res,
      status: 401,
      message: "Unauthorized",
      error: "Invalid or missing API Key. Please provide a valid 'x-api-key' in the headers.",
    });
    return;
  }

  next();
};
