import pool from "../configs/dbConn.js";

export const getFlightsCount = async (filters) => {
  let query = "SELECT COUNT(*) AS total_rows FROM flights WHERE 1=1";

  const [kiwi, values] = buildKiwi({ ...filters, order:"" });
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
  let query = "SELECT * FROM flights WHERE 1=1";
  const [kiwi, values] = buildKiwi({ ...filters, offset });
  query += kiwi;
  const client = await pool.connect();
  try {
    const fullQuery = {
      text: query,
      values: values,
    };
    console.log(fullQuery)
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
    query += ` AND airline_id = $${i}`;
    values.push(airline_id);
    i++;
  }
  if (departure_city_id) {
    query += ` AND departure_city_id = $${i}`;
    values.push(departure_city_id);
    i++;
  }
  if (destination_city_id) {
    query += ` AND destination_city_id = $${i}`;
    values.push(destination_city_id);
    i++;
  }
  if (departure_time) {
    query += ` AND departure_time = $${i}`;
    values.push(departure_time);
    i++;
  }
  if (arrival_time) {
    query += ` AND arrival_time = $${i}`;
    values.push(arrival_time);
    i++;
  }
  if (minPrice) {
    query += ` AND price >= $${i}`;
    values.push(minPrice);
    i++;
  }
  if (maxPrice) {
    query += ` AND price <= $${i}`;
    values.push(maxPrice);
    i++;
  }
  if (order) {
    query += ` ORDER BY ${order}`;
    if(desc){
        query += ` DESC`;
    }
  }
  if (limit) {
    query += ` LIMIT $${i}`
    values.push(limit)
    i++
  }
  if (offset) {
    query += ` OFFSET $${i}`
    values.push(offset)
    i++
  }
  return [query, values];
};
