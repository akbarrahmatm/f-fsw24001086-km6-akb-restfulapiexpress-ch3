const e = require("express");
const fs = require("fs");

// Cars data
const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`));

// Function

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

  const car = cars.find((car) => car.id === newCar.id);

  // If car with same ID exist, data won't created
  if (car) {
    return res.status(409).json({
      status: "Failed",
      message: `Data with ID '${newCar.id}' is already exist`,
    });
  }

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

module.exports = { getCars, getCarsById, createCars, deleteCar, updateCar };
