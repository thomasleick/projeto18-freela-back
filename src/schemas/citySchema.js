import joi from "joi";

const citySchema = joi.object({
  city_name: joi.string().required(),
  city_uf: joi.string().required().length(2),
});

export default citySchema;
