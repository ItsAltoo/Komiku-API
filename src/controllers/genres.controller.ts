import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { getGenresService } from "../services/getGenres.service.js";

export const getGenres = async (req: Request, res: Response) => {
  try {
    const { data } = await getGenresService();

    return successResponse({
      res,
      message: "Genres retrieved successfully",
      data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to retrieve genres",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
