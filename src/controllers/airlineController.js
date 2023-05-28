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
