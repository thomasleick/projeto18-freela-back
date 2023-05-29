import { cityRepository } from "../repositories/cityRepository.js";

export const cityService = {
  getCities: async () => {
    return await cityRepository.getCities();
  },

  findCityByName: async (city_name, city_uf) => {
    return await cityRepository.findCityByName(city_name, city_uf);
  },

  createCity: async (city_name, city_uf) => {
    return await cityRepository.createCity(city_name, city_uf);
  },
};
