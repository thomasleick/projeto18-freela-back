import { flightRepository } from "../repositories/flightRepository.js";

export const flightService = {
  getFlightsCount: async (filters) => {
    return await flightRepository.getFlightsCount(filters);
  },

  getFlightsPage: async (filters) => {
    return await flightRepository.getFlightsPage(filters);
  },
  getFlight: async (id) => {
    return await flightRepository.getFlight(id);
  },
};
