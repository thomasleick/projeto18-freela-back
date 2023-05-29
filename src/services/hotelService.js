import { hotelRepository } from "../repositories/hotelRepository.js";

export const hotelService = {
  getHotelsCount: async (filters) => {
    return await hotelRepository.getHotelsCount(filters);
  },

  getHotelsPage: async (filters) => {
    return await hotelRepository.getHotelsPage(filters);
  },
  getHotel: async (id) => {
    return await hotelRepository.getHotel(id);
  },
};
