import type { Request, Response } from "express";
import { latestService } from "../services/getLatest.service.js";
import { successResponse, errorResponse } from "../shared/lib/utils/index.js";

export const getLatest = async (req: Request, res: Response) => {
  const { page, orderby, type, genre, genre2, status } = req.query;
  try {
    const { data } = await latestService({
      page: Number(page) || 1,
      orderby: (orderby as any) || "",
      type: (type as any) || "",
      genre: (genre as any) || "",
      genre2: (genre2 as any) || "",
      status: (status as any) || "",
    });

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
