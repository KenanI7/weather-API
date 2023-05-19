require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authentication");
const errorMiddleware = require("./middleware/errorMiddleware");
const logger = require("./utils/logger");

const app = express();
const port = process.env.PORT || 3000;

// Session middleware
app.use(
  session({
    secret: "asdfcuzxvoe", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(morgan("combined", { stream: logger.stream }));

// Routes
app.use("/weather", weatherRoutes);
app.use("/auth", authRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
  console.log("Server running");
});
