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

export const postCity = async (req, res) => {
    try {
        console.log(req.body)
      const foundCity = await cityService.findCityByName(req.body.city_name.toLowerCase(), req.body.city_uf.toLowerCase());
      if (foundCity) {
        return res
          .status(409)
          .json({ message: "City already registered with this Name" });
      }
      await cityService.createCity(req.body.city_name, req.body.city_uf);
      res.status(201).json({ message: "City created!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }