import { cityService } from "../services/cityService.js";

export const getCities = async (req, res) => {
  try {
    const cities = await cityService.getCities();

    return res.status(200).send({ cities });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
