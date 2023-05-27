export const buildKiwi = (filters) => {
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