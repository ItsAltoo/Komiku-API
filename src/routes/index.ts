import { Router } from "express";
import { getLatest, getRecommended } from "../controllers/index.js";

const router = Router();

router.get("/recommended", getRecommended).get("/latest", getLatest);

export default router;

// type ApiResponse = {
//   success: "OK." | "ERROR.";
//   message: string;
//   error: string[];
//   meta: {
//     page: number;
//     limit: number;
//     total: number;
//   };
//   results: any;
// };
