import { photoRepository } from "../repositories/photoRepository.js";

export const photoService = {
  getPhotos: async (hotel_id) => {
    return await photoRepository.getPhotos(hotel_id);
  },

  createPhoto: async (photo) => {
    return await photoRepository.createPhoto(photo);
  },
};
