require("dotenv").config();
const express = require("express");
// const morgan = require('morgan');
const weatherRoutes = require("./routes/weatherRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(morgan('combined', { stream: logger.stream }));

app.use("/weather", weatherRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  // logger.info(`Server running on port ${port}`);
  console.log("Server runnnig bitches");
});
