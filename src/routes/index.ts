import { Router } from "express";
import { getLatest, getRanking } from "../controllers/index.js";

const router = Router();

router.get("/ranking", getRanking).get("/latest", getLatest);

export default router;