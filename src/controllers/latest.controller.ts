import type { Request, Response } from "express";
import { latestService } from "../services/getLatest.service.js";

export const getLatest = async (req: Request, res: Response) => {
  try {
    const data = await latestService();

    res.json({
      status: "success",
      results: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch latest manga",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
