import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { comicListService } from "../services/getComicList.service.js";

export const getComicList = async (req: Request, res: Response) => {
  const { page, type, letter } = req.query;
  try {
    const { data } = await comicListService({
      page: Number(page) || 1,
      type: (type as any) || "",
      letter: (letter as any) || "",
    });

    return successResponse({
      res,
      message: "Successfully fetched comic list",
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch comic list",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
