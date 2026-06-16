import type { Request, Response } from "express";
import { searchService } from "../services/getSearch.service.js";
import { successResponse, errorResponse } from "../shared/lib/utils/index.js";

export const getSearch = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const { data } = await searchService(query as string);

    return successResponse({
      res,
      message: "Successfully fetched search results",
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch search results",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
