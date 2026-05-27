import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { justAddedService } from "../services/getJustAdded.service.js";

export const getJustAdded = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    const validTypes = ["manga", "manhwa", "manhua"];
    const selectedType =
      typeof type === "string" && validTypes.includes(type) ? type : "all";

    const { data } = await justAddedService(selectedType);
    return successResponse({
      res,
      message: `Successfully fetched just added manga of type ${selectedType}`,
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch just added manga",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
