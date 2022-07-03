const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  payReqId: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  email: {
    type: String,
  },

  amount: {
    type: Number,
    required: true,
  },

  payId: {
    type: String,
  },

  status: {
    type: String,
    required: true,
  },

  payLink: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
