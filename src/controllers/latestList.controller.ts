import type { Request, Response } from "express";
import { latestListService } from "../services/getLatestList.service.js";
import { successResponse, errorResponse } from "../shared/lib/utils/index.js";

export const getLatestList = async (req: Request, res: Response) => {
  try {
    const { data } = await latestListService();

    return successResponse({
      res,
      message: "Successfully fetched latest list manga",
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch latest list manga",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
