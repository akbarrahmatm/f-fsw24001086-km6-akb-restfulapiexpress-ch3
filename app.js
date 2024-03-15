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
    totalData: cars.length,
    data: { cars },
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
      message: "Data created successfully",
      data: {
        car: newCar,
      },
    });
  });
};

const deleteCar = (req, res) => {
  const id = req.params.id;

  const car = cars.find((car) => car.id === id);
  const carIndex = cars.findIndex((car) => car.id === id);

  // Data existing validation
  if (!car) {
    return res.status(404).json({
      status: "Failed",
      message: `Car with ID ${id} not found`,
    });
  }

  // Delete spesific data in array by index
  cars.splice(carIndex, 1);

  // Write changes to cars.json
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "Success",
      message: "Data deleted successfully",
    });
  });
};

const updateCar = (req, res) => {
  // Get Car Id from parameter
  const id = req.params.id;

  // Get car data & car index
  const car = cars.find((car) => car.id === id);
  const carIndex = cars.findIndex((car) => car.id === id);

  // Data existing validation
  if (!car) {
    return res.status(404).json({
      status: "Failed",
      message: `Car with ID ${id} not found`,
    });
  }

  // Update spesific data to array
  cars[carIndex] = { ...cars[carIndex], ...req.body };

  // Write changes to cars.json
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "Success",
      message: "Data updated successfully",
    });
  });
};

// Router
app.get("/", defaultRouter);

app.route("/cars").get(getCars).post(createCars);

app.route("/cars/:id").get(getCarsById).delete(deleteCar).put(updateCar);

app.listen(PORT, () => {
  console.log(`Server running on : localhost:${PORT}`);
});
