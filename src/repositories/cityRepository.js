import pool from "../configs/dbConn.js";

export const cityRepository = {
  getCities: async () => {
    let query = "SELECT * FROM cities";

    const client = await pool.connect();
    try {
      const cities = await client.query(query);
      return cities.rows;
    } catch (err) {
      console.error("Error getting cities", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
