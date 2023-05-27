import pool from "../configs/dbConn.js";

export const getFlightsCount = async (filters) => {
  let query = "SELECT COUNT(f.*) AS total_rows FROM flights f WHERE 1=1";

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
    console.error("Error getting flights count", err);
    throw err;
  } finally {
    client.release();
  }
};

export const getFlightsPage = async (filters) => {
  const { page, limit } = filters;
  const parsedPage = page || 1;
  const offset = limit * (parsedPage - 1);
  let query = 
    `SELECT f.flight_id, a.airline_name, dc.city_name AS departure_city_name, dd.city_name AS 
        destination_city_name, f.departure_time, f.arrival_time, f.price 
    FROM flights f
    JOIN airlines a ON f.airline_id = a.airline_id
    JOIN cities dc ON f.departure_city_id = dc.city_id
    JOIN cities dd ON f.destination_city_id = dd.city_id
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
    const count = await client.query(fullQuery);
    return count.rows;
  } catch (err) {
    console.error("Error getting flights", err);
    throw err;
  } finally {
    client.release();
  }
};

const buildKiwi = (filters) => {
  const {
    airline_id,
    departure_city_id,
    destination_city_id,
    departure_time,
    arrival_time,
    minPrice,
    maxPrice,
    order,
    desc,
    limit,
    offset,
  } = filters;

  const values = [];
  let i = 1;
  let query = ``;

  if (airline_id) {
    query += ` AND f.airline_id = $${i}`;
    values.push(airline_id);
    i++;
  }
  if (departure_city_id) {
    query += ` AND f.departure_city_id = $${i}`;
    values.push(departure_city_id);
    i++;
  }
  if (destination_city_id) {
    query += ` AND f.destination_city_id = $${i}`;
    values.push(destination_city_id);
    i++;
  }
  if (departure_time) {
    query += ` AND f.departure_time = $${i}`;
    values.push(departure_time);
    i++;
  }
  if (arrival_time) {
    query += ` AND f.arrival_time = $${i}`;
    values.push(arrival_time);
    i++;
  }
  if (minPrice) {
    query += ` AND f.price >= $${i}`;
    values.push(minPrice);
    i++;
  }
  if (maxPrice) {
    query += ` AND f.price <= $${i}`;
    values.push(maxPrice);
    i++;
  }
  if (order) {
    query += ` ORDER BY f.${order}`;
    if (desc) {
      query += ` DESC`;
    }
  }
  if (limit) {
    query += ` LIMIT $${i}`;
    values.push(limit);
    i++;
  }
  if (offset) {
    query += ` OFFSET $${i}`;
    values.push(offset);
    i++;
  }
  return [query, values];
};
