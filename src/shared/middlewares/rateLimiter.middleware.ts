import { rateLimit } from "express-rate-limit";
import { errorResponse } from "../lib/utils/response.js";
import type { Request, Response } from "express";

export const rateLimiter = rateLimit({
  windowMs: 90 * 1000, // 90 seconds (1:30 minutes)
  max: 200, // Limit each IP to 200 requests per `windowMs`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    errorResponse({
      res,
      status: 429,
      message: "Too Many Requests",
      error: "You have exceeded the 200 requests per 90 seconds limit. Please try again later.",
    });
  },
});
