import joi from "joi";

const photoSchema = joi.object({
  hotel_id: joi.number().integer().positive().required(),
  photo_url: joi.string().uri().required(),
});

export default photoSchema;
