import { Router } from "express";
import { getHotels, getHotelById } from "../controllers/hotelController.js";
import { validateIdAsParams } from "../middlewares/validateParams.js";

const router = Router();

router.get("/", getHotels);
router.get("/:id", validateIdAsParams, getHotelById);
router.post("/",);

export default router;
