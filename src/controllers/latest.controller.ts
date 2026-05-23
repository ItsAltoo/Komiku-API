import type { Request, Response } from "express";
import { latestService } from "../services/getLatest.service.js";
import { successResponse, errorResponse } from "../lib/utils/index.js";

export const getLatest = async (req: Request, res: Response) => {
  try {
    const { data } = await latestService();

    return successResponse({
      res,
      message: "Successfully fetched latest manga",
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch latest manga",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
