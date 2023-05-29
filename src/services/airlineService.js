import { airlineRepository } from "../repositories/airlineRepository.js";

export const airlineService = {
  getAirlines: async () => {
    return await airlineRepository.getAirlines();
  },

  findAirlineByName: async (airline_name) => {
    return await airlineRepository.findAirlineByName(airline_name);
  },

  createAirline: async (airline_name) => {
    return await airlineRepository.createAirline(airline_name);
  },
};
