const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const connect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error - ", error);
  }
};

module.exports = connect;
