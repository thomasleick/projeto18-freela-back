import { Router } from "express";
import { getFlights, getFlightById, postFlight } from "../controllers/flightController.js";
import { validateIdAsParams } from "../middlewares/validateParams.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import flightSchema from "../schemas/flightSchema.js";

const router = Router();

router.get("/", getFlights);
router.get("/:id", validateIdAsParams, getFlightById);
router.post("/", schemaValidator(flightSchema), postFlight);

export default router;
