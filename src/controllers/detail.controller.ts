import type { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../shared/lib/utils/response.js";
import { detailService } from "../services/getDetail.service.js";

export const getDetail = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const { data } = await detailService(slug as string);

    return successResponse({
      res,
      message: "Successfully fetched comic detail",
      data: data,
    });
  } catch (error) {
    return errorResponse({
      res,
      message: "Failed to fetch comic detail",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
