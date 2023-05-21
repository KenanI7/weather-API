const weatherService = require("../services/weatherService");

const weatherController = {
  getCurrentWeather: async (req, res, next) => {
    try {
      const { location } = req.query;
      const weatherData = await weatherService.getCurrentWeather(location);
      res.status(200).json(weatherData);
    } catch (error) {
      next(error);
    }
  },

  getWeatherForecast: async (req, res, next) => {
    try {
      const { location, days } = req.query;
      const forecastData = await weatherService.getWeatherForecast(
        location,
        days
      );
      res.status(200).json(forecastData);
    } catch (error) {
      next(error);
    }
  },

  getWeatherHistory: async (req, res, next) => {
    try {
      const { location, startDate, endDate } = req.query;
      const historyData = await weatherService.getWeatherHistory(
        location,
        startDate,
        endDate
      );
      res.status(200).json(historyData);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = weatherController;
