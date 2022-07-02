// If we are not in production then use .env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Middleware
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
