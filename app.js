// Package
const express = require("express");
const morgan = require("morgan");

const defaultRoutes = require("./routes/defaultRoutes");
const carsRoutes = require("./routes/carsRoutes");

// Initial Config
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Router
app.use("/", defaultRoutes);
app.use("/cars", carsRoutes);

module.exports = app;
