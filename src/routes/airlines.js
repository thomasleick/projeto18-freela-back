import { Router } from "express";
import { getAirlines, postAirline } from "../controllers/airlineController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import airlineSchema from "../schemas/airlineSchema.js";

const router = Router();

router.get("/", getAirlines);
router.post("/", schemaValidator(airlineSchema), postAirline);

export default router;
