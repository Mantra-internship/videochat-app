const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    phone: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
    },

    profilePic: {
      type: String,
      default: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
    },

    otp: {
      type: String,
    },

    // To keep record of previous number incase of phone number updation
    prevPhone: {
      type: String,
      default: null,
    },

    tempPhone: {
      type: String,
      default: null,
    },

    tempPhoneOtp: {
      type: String,
      default: null,
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

    astrologerInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AstrologerInfo",
      default: null
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
