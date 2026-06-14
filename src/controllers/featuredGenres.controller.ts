import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { getFeaturedGenresService } from "../services/getFeaturedGenres.service.js";

export const getFeaturedGenres = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
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

    const { data } = await getFeaturedGenresService(selectedGenre);

    return successResponse({
      res,
      message: `Successfully fetched featured genres of type ${selectedGenre}`,
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch featured genres",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
