import type { Request, Response } from "express";
import rankingService from "../services/getRanking.service.js";
import { successResponse, errorResponse } from "../shared/lib/utils/index.js";

export const getRanking = async (req: Request, res: Response) => {
  try {
    const { period } = req.query;

    const validPeriods = ["daily", "weekly", "all"];
    const selectedPeriod =
      typeof period === "string" && validPeriods.includes(period)
        ? period
        : "all";

    const { data } = await rankingService(selectedPeriod);

    return successResponse({
      res,
      message: `Successfully fetched ${selectedPeriod} ranking manga`,
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch ranking manga",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
