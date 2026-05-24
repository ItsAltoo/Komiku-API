import { Router } from "express";
import {
  getLatest,
  getPopularUpdate,
  getRanking,
  getJustAdded,
  getListGenre,
} from "../controllers/index.js";

const router = Router();

router
  .get("/ranking", getRanking)
  .get("/latest", getLatest)
  .get("/popular-update", getPopularUpdate)
  .get("/just-added", getJustAdded)
  .get("/list-genre", getListGenre)

export default router;
