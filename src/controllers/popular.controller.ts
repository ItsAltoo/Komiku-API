import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { popularService } from "../services/getPopular.service.js";

export const getPopular = async (req: Request, res: Response) => {
  const { page, orderby, type } = req.query;
  try {
    const { data } = await popularService({
      page: Number(page) || 1,
      orderby: (orderby as any) || "",
      type: (type as any) || "",
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
