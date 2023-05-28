import { Router } from "express";
import { getAirlines } from "../controllers/airlineController.js";

const router = Router();

router.get("/", getAirlines);

export default router;
