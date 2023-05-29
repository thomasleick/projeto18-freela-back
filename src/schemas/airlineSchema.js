import joi from "joi";

const airlineSchema = joi.object({
  airline_name: joi.string().required(),
});

export default airlineSchema;
