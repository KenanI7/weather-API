const axios = require("axios");
const cache = require("node-cache");
const logger = require("../utils/logger");

const weatherCache = new cache({ stdTTL: 600 }); // Cache weather data for 10 minutes

const weatherService = {
  getCurrentWeather: async (location) => {
    const cachedData = weatherCache.get(location);
    if (cachedData) {
      logger.info(`Returning cached current weather data for ${location}`);
      return cachedData;
    }

    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: location },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const weatherData = response.data;

      // Cache weather data
      weatherCache.set(location, weatherData);

      logger.info(`Retrieved and cached current weather data for ${location}`);
      return weatherData;
    } catch (error) {
      logger.error(`Failed to fetch current weather data for ${location}`);
      throw new Error("Failed to fetch current weather data");
    }
  },

  getWeatherForecast: async (location, days) => {
    const cachedData = weatherCache.get(`${location}-${days}`);
    if (cachedData) {
      logger.info(`Returning cached weather forecast data for ${location}`);
      return cachedData;
    }

    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: {
        q: location,
        days: days,
      },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const forecastData = response.data;

      // Cache weather data
      weatherCache.set(`${location}-${days}`, forecastData);

      logger.info(`Retrieved and cached weather forecast data for ${location}`);
      return forecastData;
    } catch (error) {
      logger.error(`Failed to fetch weather forecast data for ${location}`);
      throw new Error("Failed to fetch weather forecast data");
    }
  },

  getWeatherHistory: async (location, startDate, endDate) => {
    const cachedData = weatherCache.get(`${location}-${startDate}-${endDate}`);
    if (cachedData) {
      logger.info(`Returning cached weather history data for ${location}`);
      return cachedData;
    }

    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/history.json",
      params: {
        q: location,
        dt: startDate,
        end_dt: endDate,
      },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const historyData = response.data;

      // Cache weather data
      weatherCache.set(`${location}-${startDate}-${endDate}`, historyData);

      logger.info(`Retrieved and cached weather history data for ${location}`);
      return historyData;
    } catch (error) {
      logger.error(`Failed to fetch weather history data for ${location}`);
      throw new Error("Failed to fetch weather history data");
    }
  },
};

module.exports = weatherService;
