import joi from "joi";

const hotelSchema = joi.object({
  city_id: joi.number().integer().positive().required(),
  hotel_name: joi.string().required(),
  description: joi.string().required(),
  amenities: joi.string().required(),
  price_per_night: joi.number().precision(2).positive().required(),
});

export default hotelSchema;
