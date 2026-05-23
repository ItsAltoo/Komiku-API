import { Router } from "express";
import {
  getLatest,
  getPopularUpdate,
  getRanking,
  getJustAdded
} from "../controllers/index.js";

const router = Router();

router
  .get("/ranking", getRanking)
  .get("/latest", getLatest)
  .get("/popular-update", getPopularUpdate)
  .get("/just-added", getJustAdded);

export default router;
