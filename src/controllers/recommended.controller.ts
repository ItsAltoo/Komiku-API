import type { Request, Response } from "express";
import recommendedService from "../services/getRecommended.service.js";

export const getRecommended = async (req: Request, res: Response) => {
  try {
    const { data } = await recommendedService("/");

    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch recommended manga",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
