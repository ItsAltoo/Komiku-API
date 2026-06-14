import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { popularService } from "../services/getPopular.service.js";
import type { KomikType } from "../shared/types/index.js";

export const getPopular = async (req: Request, res: Response) => {
  const { page, orderBy, type } = req.query;

  try {
    const pageNumber = page ? parseInt(page as string, 10) : 1;

    const { data } = await popularService({
      page: pageNumber,
      orderBy: orderBy as "modified" | "date" | "rand" | "ranking",
      type: type as KomikType,
    });

    return successResponse({
      res,
      message: "Popular manga fetched successfully",
      data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch popular manga",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
