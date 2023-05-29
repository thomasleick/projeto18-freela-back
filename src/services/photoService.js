import { photoRepository } from "../repositories/photoRepository.js";

export const photoService = {
  getPhotos: async (hotel_id) => {
    return await photoRepository.getPhotos(hotel_id);
  },

};