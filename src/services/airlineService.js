import { airlineRepository } from "../repositories/airlineRepository.js";

export const airlineService = {
  getAirlines: async () => {
    return await airlineRepository.getAirlines();
  },

};