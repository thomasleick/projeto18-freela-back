import joi from "joi";

const flightSchema = joi.object({
  airline_id: joi.number().integer().positive().required(),
  departure_city_id: joi.number().integer().positive().required(),
  destination_city_id: joi.number().integer().positive().required(),
  departure_time: joi.date().iso().required(),
  arrival_time: joi.date().iso().required(),
  price: joi.number().precision(2).positive().required(),
});

export default flightSchema;
