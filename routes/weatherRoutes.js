const express = require("express");
const {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherHistory,
} = require("../api/controllers/weatherController");
// const cacheMiddleware = require('../middlewares/cacheMiddleware');
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get(
  "/current",
  // authMiddleware,
  // cacheMiddleware,
  getCurrentWeather
);

router.get(
  "/forecast",
  // authMiddleware,
  // cacheMiddleware,
  getWeatherForecast
);

router.get(
  "/history",
  // authMiddleware,
  // cacheMiddleware,
  getWeatherHistory
);

module.exports = router;
