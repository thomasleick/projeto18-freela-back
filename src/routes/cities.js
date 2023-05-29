import { Router } from "express";
import { getCities, postCity } from "../controllers/cityController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import citySchema from "../schemas/citySchema.js";

const router = Router();

router.get("/", getCities);
router.post("/", schemaValidator(citySchema), postCity);

export default router;
