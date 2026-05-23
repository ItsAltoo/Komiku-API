import { Router } from "express";
import {
  getLatest,
  getPopularUpdate,
  getRanking,
} from "../controllers/index.js";

const router = Router();

router
  .get("/ranking", getRanking)
  .get("/latest", getLatest)
  .get("/popular-update", getPopularUpdate);

export default router;
