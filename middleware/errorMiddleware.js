const logger = require("../utils/logger");

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === "ValidationError") {
    // Handle validation errors
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // Handle unauthorized errors
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (err.name === "NotFoundError") {
    // Handle not found errors
    return res.status(404).json({ error: "Resource not found" });
  }

  // Generic error handling
  logger.error("An error occurred:", err);
  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorMiddleware;
