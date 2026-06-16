import type { Request, Response, NextFunction } from "express";
import axios from "axios";
import { api } from "../shared/lib/api.js";
import { reqConfig } from "../shared/lib/utils/requestConfig.js";

export const proxyImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const imageUrl = req.query.url as string;

    if (!imageUrl) {
      res.status(400).json({ error: "Image URL is required" });
      return;
    }

    const response = await api.get(imageUrl, {
      ...reqConfig,
      responseType: "arraybuffer",
    });

    if (response.headers["content-type"]) {
      res.setHeader("Content-Type", response.headers["content-type"] as string);
    }
    if (response.headers["cache-control"]) {
      res.setHeader("Cache-Control", response.headers["cache-control"] as string);
    }

    res.end(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).send(error.response.statusText);
    } else {
      next(error);
    }
  }
};
