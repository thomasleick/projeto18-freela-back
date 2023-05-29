import pool from "../configs/dbConn.js";
import { buildFlightKiwi } from "./helpers.js";

export const flightRepository = {
  getFlightsCount: async (filters) => {
    let query = "SELECT COUNT(f.*) AS total_rows FROM flights f WHERE 1=1";

    const [kiwi, values] = buildFlightKiwi({ ...filters, order: "" });
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
      console.error("Error getting flights count", err);
      throw err;
    } finally {
      client.release();
    }
  },

  getFlightsPage: async (filters) => {
    const { page, limit } = filters;
    const parsedPage = page || 1;
    const offset = limit * (parsedPage - 1);
    let query = `SELECT f.flight_id, a.airline_name, dc.city_name AS departure_city_name, dd.city_name AS 
        destination_city_name, f.departure_time, f.arrival_time, f.price 
      FROM flights f
      JOIN airlines a ON f.airline_id = a.airline_id
      JOIN cities dc ON f.departure_city_id = dc.city_id
      JOIN cities dd ON f.destination_city_id = dd.city_id
      WHERE 1=1`;

    const [kiwi, values] = buildFlightKiwi({ ...filters, offset });
    query += kiwi;
    const client = await pool.connect();
    try {
      const fullQuery = {
        text: query,
        values: values,
      };
      console.log(fullQuery);
      const flights = await client.query(fullQuery);
      return flights.rows;
    } catch (err) {
      console.error("Error getting flights", err);
      throw err;
    } finally {
      client.release();
    }
  },
  getFlight: async (id) => {
    const query = `SELECT f.flight_id, a.airline_name, dc.city_name AS departure_city_name, dd.city_name AS 
      destination_city_name, f.departure_time, f.arrival_time, f.price 
    FROM flights f
    JOIN airlines a ON f.airline_id = a.airline_id
    JOIN cities dc ON f.departure_city_id = dc.city_id
    JOIN cities dd ON f.destination_city_id = dd.city_id WHERE flight_id=$1`;
    const values = [id];

    const client = await pool.connect();
    try {
      const fullQuery = {
        text: query,
        values: values,
      };
      const flight = await client.query(fullQuery);

      return flight.rows[0];
    } catch (err) {
      console.error("Error getting flight", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
