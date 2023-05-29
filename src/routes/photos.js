import { Router } from "express";
import { getPhotos, postPhoto } from "../controllers/photoController.js";
import { validateIdAsParams } from "../middlewares/validateParams.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import photoSchema from "../schemas/photoSchema.js";

const router = Router();

router.get("/:id", validateIdAsParams, getPhotos);
router.post("/", schemaValidator(photoSchema), postPhoto);

export default router;
