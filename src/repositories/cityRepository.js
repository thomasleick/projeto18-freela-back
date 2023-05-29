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

  findCityByName: async (city_name, city_uf) => {
    const client = await pool.connect();
    const query = `SELECT * FROM cities WHERE LOWER(city_name) = LOWER($1) AND LOWER(city_uf) = LOWER($2)`;
    try {
      const citys = await client.query(query, [city_name, city_uf]);
      return citys.rows[0];
    } catch (err) {
      console.error("Error getting city", err);
      throw err;
    } finally {
      client.release();
    }
  },

  createCity: async (city_name, city_uf) => {
    const client = await pool.connect();
    const query = `INSERT INTO cities(city_name, city_uf) VALUES($1, $2)`;
    try {
      const citys = await client.query(query, [city_name, city_uf]);
      return citys.rows[0];
    } catch (err) {
      console.error("Error inserting city", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
