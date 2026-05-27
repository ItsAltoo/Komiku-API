import type { Response } from "express";

type Meta = {
  total: number;
  page: number;
  limit: number;
};

type SuccessResponseParams = {
  res: Response;
  message?: string;
  data?: any;
  meta?: Meta | null;
};

type ErrorResponseParams = {
  res: Response;
  message?: string;
  error?: any;
  status?: number;
};

export const successResponse = ({
  res,
  message = "Successfully fetched data.",
  data = null,
  meta = null,
}: SuccessResponseParams) => {
  return res.status(200).json({
    status: "OK",
    message,
    error: [],
    meta,
    data,
  });
};

export const errorResponse = ({
  res,
  message = "Internal Server Error",
  error = [],
  status = 500,
}: ErrorResponseParams) => {
  return res.status(status).json({
    status: "ERROR",
    message,
    error: Array.isArray(error) ? error : [error],
    meta: {
      total: 0,
      page: 0,
      limit: 0,
    },
    data: [],
  });
};
