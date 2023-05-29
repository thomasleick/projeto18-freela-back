import express from "express";
import { urlencoded, json } from "express";
import cors from "cors";
import corsOptions from "./configs/corsOptions.js";
import credentials from "./middlewares/credentials.js";
import cookieParser from "cookie-parser";

// Import Routes
import authRoute from "./routes/auth.js";
import flightRoute from "./routes/flights.js";
import cityRoute from "./routes/cities.js";
import airlineRoute from "./routes/airlines.js";
import hotelRoute from "./routes/hotels.js";

const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(urlencoded({ extended: false }));

// built-in middleware for json
app.use(json());

// middleware for cookies
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Routes
app.use("/auth", authRoute);
app.use("/flights", flightRoute);
app.use("/cities", cityRoute);
app.use("/airlines", airlineRoute);
app.use("/hotels", hotelRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
