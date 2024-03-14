// Package
const fs = require("fs");
const express = require("express");

// Initial Config
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Cars data
const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`));

// Function
const defaultRouter = (req, res) => {
  res.status(200).json({
    message: "Ping Successfully",
  });
};

const getCars = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: { cars },
  });
};

// Router
app.get("/", defaultRouter);

app.route("/cars").get(getCars);

app.listen(PORT, () => {
  console.log(`Server running on : localhost:${PORT}`);
});
