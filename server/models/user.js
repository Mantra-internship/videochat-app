const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    phone: {
      type: String,
    },

    email: {
      type: String,
    },

    otp: {
      type: String,
    },

    authToken: {
      type: String,
    },

    approved: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "user",
    },

    credits: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
