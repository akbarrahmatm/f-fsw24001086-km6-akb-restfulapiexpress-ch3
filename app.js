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
    message: "Data retrieved successfully",
    data: { cars },
    totalData: cars.length,
  });
};

const getCarsById = (req, res) => {
  const id = req.params.id;
  const car = cars.find((car) => car.id === id);
  if (!car) {
    return res.status(404).json({
      status: "Failed",
      message: `Car with ID ${id} not found`,
    });
  }
  res.status(200).json({
    status: "Success",
    message: "Data retrieved successfully",
    data: { car },
  });
};

const createCars = (req, res) => {
  const newCar = req.body;
  cars.push(newCar);
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "Success",
      message: "Data inserted successfully",
      data: {
        car: newCar,
      },
    });
  });
};

// Router
app.get("/", defaultRouter);

app.route("/cars").get(getCars).post(createCars);

app.route("/cars/:id").get(getCarsById);

app.listen(PORT, () => {
  console.log(`Server running on : localhost:${PORT}`);
});
