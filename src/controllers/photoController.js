import { photoService } from "../services/photoService.js";

export const getPhotos = async (req, res) => {
  try { 
    const photos = await photoService.getPhotos(req?.params?.id);
    return res.status(200).send({ photos });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

export const postPhoto = async (req, res) => {
  try {
    await photoService.createPhoto(req.body);
    res.status(201).json({ message: "Photo created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}