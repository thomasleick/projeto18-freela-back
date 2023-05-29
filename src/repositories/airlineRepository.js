import pool from "../configs/dbConn.js";

export const airlineRepository = {
  getAirlines: async () => {
    const client = await pool.connect();

    const query = "SELECT * FROM airlines";

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

  findAirlineByName: async (airline_name) => {
    const client = await pool.connect();
    const query = `SELECT * FROM airlines WHERE LOWER(airline_name) = LOWER($1)`;
    try {
      const airlines = await client.query(query, [airline_name]);
      return airlines.rows[0];
    } catch (err) {
      console.error("Error getting airlines", err);
      throw err;
    } finally {
      client.release();
    }
  },

  createAirline: async (airline_name) => {
    const client = await pool.connect();
    const query = `INSERT INTO airlines(airline_name) VALUES($1)`;
    try {
      const airlines = await client.query(query, [airline_name]);
      return airlines.rows[0];
    } catch (err) {
      console.error("Error getting airlines", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
