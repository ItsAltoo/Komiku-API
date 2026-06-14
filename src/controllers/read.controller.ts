import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { readService } from "../services/getRead.service.js";

export const getRead = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const { data } = await readService(slug as string);

    return successResponse({
      res,
      message: "Successfully fetched read",
      data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch read",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
