import pool from "../configs/dbConn.js";
import { buildHotelKiwi } from "./helpers.js";

export const hotelRepository = {
  getHotelsCount: async (filters) => {
    let query = "SELECT COUNT(h.*) AS total_rows FROM hotels h WHERE 1=1";

    const [kiwi, values] = buildHotelKiwi({ ...filters, order: "" });
    query += kiwi;
    const client = await pool.connect();
    try {
      const fullQuery = {
        text: query,
        values: values,
      };
      console.log(fullQuery);
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

    const [kiwi, values] = buildHotelKiwi({ ...filters, offset });
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
    const query = `SELECT h.hotel_id, c.city_name, h.hotel_name, h.description, h.amenities, h.price_per_night,
      (
        SELECT json_agg(json_build_object('photo_id', p.photo_id, 'photo_url', p.photo_url))
        FROM photos p
        WHERE p.hotel_id = h.hotel_id
      ) AS photos
      FROM hotels h
      JOIN cities c ON c.city_id = h.city_id
      WHERE h.hotel_id = $1`;
    const values = [id];

    const client = await pool.connect();
    try {
      const fullQuery = {
        text: query,
        values: values,
      };
      const result = await client.query(fullQuery);

      const hotel = result.rows[0];

      return hotel;
    } catch (err) {
      console.error("Error getting hotel", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
