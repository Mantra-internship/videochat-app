const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
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

    purpose: {
      type: String,
    },

    paymentRequestId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
    },

    paymentRequestStatus: {
      type: String,
    },

    paymentStatus: {
      type: String,
    },

    paymentLink: {
      type: String,
      required: true,
    },

    currency: {
      type: String,
    },

    paymentCreatedAt: {
      type: Date,
    },

    paymentRequestCreatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
