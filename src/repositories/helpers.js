export const buildKiwi = (filters) => {
    console.log(filters)
    const {
      airline_id,
      departureCities,
      destinationCities,
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
    if (departureCities) {
      const idsArray = departureCities.split(",");
      const numericIdsArray = idsArray.map(Number);
      query += ` AND f.departure_city_id = ANY($${i}::int[])`;
      values.push(numericIdsArray);
      i++;
    }
    if (destinationCities) {
        const idsArray = destinationCities.split(",");
      const numericIdsArray = idsArray.map(Number);
      query += ` AND f.destination_city_id = ANY($${i}::int[])`;
      values.push(numericIdsArray);
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
    console.log(query)
    console.log(values)
    return [query, values];
  };