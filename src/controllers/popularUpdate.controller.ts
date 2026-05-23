import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../lib/utils/response.js";
import { popularUpdateService } from "../services/getPopularUpdate.service.js";

export const getPopularUpdate = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    const validTypes = ["manga", "manhwa", "manhua"];
    const selectedType =
      typeof type === "string" && validTypes.includes(type) ? type : "all";

    const { data } = await popularUpdateService(selectedType);

    return successResponse({
      res,
      message: `Successfully fetched popular update manga of type ${selectedType}`,
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch popular update manga",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
