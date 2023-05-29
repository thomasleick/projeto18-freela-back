import { Router } from "express";
import {
  getHotels,
  getHotelById,
  postHotel,
} from "../controllers/hotelController.js";
import { validateIdAsParams } from "../middlewares/validateParams.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import hotelSchema from "../schemas/hotelSchema.js";

const router = Router();

router.get("/", getHotels);
router.get("/:id", validateIdAsParams, getHotelById);
router.post("/", schemaValidator(hotelSchema), postHotel);

export default router;
