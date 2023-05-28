import { Router } from "express";
import { getFlights, getFlightById } from "../controllers/flightController.js";
import { validateIdAsParams } from "../middlewares/validateParams.js";

const router = Router();

router.get("/", getFlights);
router.get("/:id", validateIdAsParams, getFlightById);

export default router;
