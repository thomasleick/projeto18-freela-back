import { flightService } from "../services/flightService.js";

const { getFlightsCount, getFlightsPage } = flightService;

export const getFlights = async (req, res) => {
  const { page } = req?.query;
  const pageLenght = 30;

  try {
    const flightCount = await getFlightsCount(req?.query);
    const maxPage = Math.ceil(flightCount / pageLenght);
    const parsedPage = parseInt(page);

    if (!/[1-9][0-9]*/.test(page) || parsedPage > maxPage)
      return res.sendStatus(404);

    const flights = await getFlightsPage({ ...req?.query, limit: pageLenght });
    return res.send({
      flightCount,
      maxPage,
      flights,
      page: parsedPage,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
