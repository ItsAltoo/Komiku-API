import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { similarComicsService } from "../services/getSimilarComics.service.js";

export const getSimilarComics = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const { data } = await similarComicsService(slug as string);

    return successResponse({
      res,
      message: "Successfully fetched similar comics",
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch similar comics",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
