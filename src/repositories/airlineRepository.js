import pool from "../configs/dbConn.js";

export const airlineRepository = {
  getAirlines: async () => {
    let query = "SELECT * FROM airlines";

    const client = await pool.connect();
    try {
      const airlines = await client.query(query);
      return airlines.rows;
    } catch (err) {
      console.error("Error getting airlines", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
