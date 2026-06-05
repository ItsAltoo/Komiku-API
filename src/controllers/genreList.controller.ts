import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { genreListService } from "../services/getGenreList.service.js";

export const getGenreList = async (req: Request, res: Response) => {
  try {
    const { data } = await genreListService();

    return successResponse({
      res,
      message: "Genre list retrieved successfully",
      data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to retrieve genre list",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
