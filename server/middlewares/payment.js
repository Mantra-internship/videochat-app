const Payment = require("../models/payment");
const { verifyAuthToken } = require("../utils/auth");

const payment = {
  validate: async (req, res, next) => {
    try {
      const authToken = req.headers.authorization.split(" ")[1];
      const decodedToken = await verifyAuthToken(authToken);
      req.userId = decodedToken.id;

      next();
    } catch (error) {
      console.log("Middlewares: validate - ", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  checkForPayment: async (req, res, next) => {
    try {
      const paymentId = req.query.payment_id;
      const paymentStatus = req.query.status;
      const paymentRequestId = req.query.payment_request_id;

      const payment = await Payment.findOne({ payReqId: paymentRequestId });
      if (payment) {
        next();
      } else {
        return res.status(500).json({
          message: "Payment not found",
        });
      }
    } catch (error) {
      console.log("Middlewares: checkForPayment - ", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
};

module.exports = payment;
