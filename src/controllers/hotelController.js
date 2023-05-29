import { hotelService } from "../services/hotelService.js";

const { getHotelsCount, getHotelsPage, getHotel } = hotelService;

export const getHotels = async (req, res) => {
  const { page } = req?.query;
  const pageLenght = 30;

  try {
    const hotelCount = await getHotelsCount(req?.query);
    if (hotelCount === "0") {
      return res.status(204).send({
        hotelCount: 0,
        maxPage: 0,
        hotels: [],
        page: 0,
      });
    }
    const maxPage = Math.ceil(hotelCount / pageLenght);
    const parsedPage = parseInt(page);

    if (!/[1-9][0-9]*/.test(page) || parsedPage > maxPage)
      return res.sendStatus(404);

    const hotels = await getHotelsPage({ ...req?.query, limit: pageLenght });
    return res.send({
      hotelCount,
      maxPage,
      hotels,
      page: parsedPage,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

export const getHotelById = async (req, res) => {
  try {
    const hotel = await getHotel(req?.params?.id);
    if (!hotel) {
      return res.sendStatus(404);
    }
    return res.status(200).json(hotel);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
