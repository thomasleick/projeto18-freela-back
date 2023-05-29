import pool from "../configs/dbConn.js";
import { buildKiwi } from "./helpers.js";

export const hotelRepository = {
  getHotelsCount: async (filters) => {
    let query = "SELECT COUNT(h.*) AS total_rows FROM hotels h";

    const [kiwi, values] = buildKiwi({ ...filters, order: "" });
    query += kiwi;
    const client = await pool.connect();
    try {
      const fullQuery = {
        text: query,
        values: values,
      };
      const count = await client.query(fullQuery);

      return count.rows[0].total_rows;
    } catch (err) {
      console.error("Error getting hotels count", err);
      throw err;
    } finally {
      client.release();
    }
  },

  getHotelsPage: async (filters) => {
    const { page, limit } = filters;
    const parsedPage = page || 1;
    const offset = limit * (parsedPage - 1);
    let query = `SELECT h.hotel_id, c.city_name, h.hotel_name, h.description, h.amenities, h.price_per_night
    FROM hotels h
    JOIN cities c ON c.city_id = h.city_id
    WHERE 1=1`;

    const [kiwi, values] = buildKiwi({ ...filters, offset });
    query += kiwi;
    const client = await pool.connect();
    try {
      const fullQuery = {
        text: query,
        values: values,
      };
      console.log(fullQuery);
      const hotels = await client.query(fullQuery);
      return hotels.rows;
    } catch (err) {
      console.error("Error getting hotels", err);
      throw err;
    } finally {
      client.release();
    }
  },
  getHotel: async (id) => {
    const query = `SELECT h.hotel_id, c.city_name, h.hotel_name, h.description, h.amenities, h.price_per_night
    FROM hotels h
    JOIN cities c ON c.city_id = h.city_id
    WHERE hotel_id=$1`;
    const values = [id];

    const client = await pool.connect();
    try {
      const fullQuery = {
        text: query,
        values: values,
      };
      const hotel = await client.query(fullQuery);

      return hotel.rows[0];
    } catch (err) {
      console.error("Error getting hotel", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
