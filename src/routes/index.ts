import { Router } from "express";
import * as control from "../controllers/index.js";

const router = Router();

router
  .get("/ranking", control.getRanking)
  .get("/latest-list", control.getLatestList)
  .get("/popular-update", control.getPopularUpdate)
  .get("/just-added", control.getJustAdded)
  .get("/list-genre", control.getListGenre)
  .get("/latest", control.getLatest)

export default router;
