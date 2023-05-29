export const buildFlightKiwi = (filters) => {
  const {
    airlineList,
    departureCities,
    destinationCities,
    selectedDate,
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

  if (airlineList) {
    const idsArray = airlineList.split(",");
    const numericIdsArray = idsArray.map(Number);
    query += ` AND f.airline_id = ANY($${i}::int[])`;
    values.push(numericIdsArray);
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
  if (selectedDate) {
    query += ` AND f.departure_time::date = $${i}`;
    values.push(selectedDate);
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

export const buildHotelKiwi = (filters) => {
  const { cities, minPrice, maxPrice, order, desc, limit, offset } = filters;

  const values = [];
  let i = 1;
  let query = ``;

  if (cities) {
    const idsArray = cities.split(",");
    const numericIdsArray = idsArray.map(Number);
    query += ` AND h.city_id = ANY($${i}::int[])`;
    values.push(numericIdsArray);
    i++;
  }
  if (minPrice) {
    query += ` AND h.price_per_night >= $${i}`;
    values.push(minPrice);
    i++;
  }
  if (maxPrice) {
    query += ` AND h.price_per_night <= $${i}`;
    values.push(maxPrice);
    i++;
  }
  if (order) {
    query += ` ORDER BY h.${order}`;
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
