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
};
