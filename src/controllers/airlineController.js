import { airlineService } from "../services/airlineService.js";

export const getAirlines = async (req, res) => {
  try {
    const airlines = await airlineService.getAirlines();
    return res.status(200).send({ airlines });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

export const postAirline = async (req, res) => {
  try {
    const foundAirline = await airlineService.findAirlineByName(
      req.body.airline_name.toLowerCase()
    );
    if (foundAirline) {
      return res
        .status(409)
        .json({ message: "Airline already registered with this Name" });
    }
    await airlineService.createAirline(req.body.airline_name);
    res.status(201).json({ message: "Airline created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
