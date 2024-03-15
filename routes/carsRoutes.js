const express = require("express");

const router = express.Router();

const carsController = require("../controllers/carsController");

router.route("/").get(carsController.getCars).post(carsController.createCars);

router
  .route("/:id")
  .get(carsController.getCarsById)
  .delete(carsController.deleteCar)
  .put(carsController.updateCar);

module.exports = router;
