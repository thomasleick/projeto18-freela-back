import { cityRepository } from "../repositories/cityRepository.js";

export const cityService = {
  getCities: async () => {
    return await cityRepository.getCities();
  },

};