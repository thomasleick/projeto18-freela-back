import pool from "../configs/dbConn.js";

export const photoRepository = {
  getPhotos: async (hotel_id) => {
    let query = "SELECT * FROM photos WHERE hotel_id=$1";

    const client = await pool.connect();
    try {
      const photos = await client.query(query, [hotel_id]);
      return photos.rows;
    } catch (err) {
      console.error("Error getting photos", err);
      throw err;
    } finally {
      client.release();
    }
  },

  createPhoto: async (photo) => {
    const client = await pool.connect();

    const columns = Object.keys(photo).join(", ");
    const placeholders = Object.keys(photo)
      .map((_, index) => `$${index + 1}`)
      .join(", ");

    const query = `INSERT INTO photos(${columns}) VALUES(${placeholders})`;
    try {
      const response = await client.query(query, Object.values(photo));
      return response.rows[0];
    } catch (err) {
      console.error("Error inserting photo", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
