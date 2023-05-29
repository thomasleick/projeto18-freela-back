import { Router } from "express";
import { getPhotos } from "../controllers/photoController.js";
import { validateIdAsParams } from "../middlewares/validateParams.js";

const router = Router();

router.get("/:id", validateIdAsParams,getPhotos);

export default router;
