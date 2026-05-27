import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { listGenreService } from "../services/getListGenre.service.js";

export const getListGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    const validGenres = [
      "isekai",
      "fantasy",
      "romance",
      "ecchi",
      "drama",
      "sliceOfLife",
      "schoolLife",
      "comedy",
      "action",
      "adventure",
    ];

    const selectedGenre =
      typeof name === "string" && validGenres.includes(name) ? name : "all";

    const { data } = await listGenreService(selectedGenre);

    return successResponse({
      res,
      message: `Successfully fetched list genre of type ${selectedGenre}`,
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch list genre",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
