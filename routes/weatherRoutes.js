const express = require("express");
const {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherHistory,
} = require("../controllers/weatherController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/current", authMiddleware, getCurrentWeather);

router.get("/forecast", authMiddleware, getWeatherForecast);

router.get("/history", authMiddleware, getWeatherHistory);

module.exports = router;
