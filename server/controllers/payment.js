const Insta = require("../utils/payment");
const Payment = require("../models/payment");

const payment = {
  createPayment: async (req, res) => {
    try {
      const REDIRECT_URL = process.env.REDIRECT_URL;
      const { name, phone, amount } = req.body;
      const data = new Insta.PaymentData();
      let payreqid;

      data.setRedirectUrl(REDIRECT_URL);
      data.send_sms = "True";
      // data.send_email = "True";
      data.purpose = "Test";
      data.amount = amount;
      data.buyer_name = name;
      data.phone = phone;

      Insta.createPayment(data, async (error, response) => {
        if (error) {
          console.log("Create payment error - ", error);
        } else {
          const paymentRequestData = JSON.parse(response);
          paymentLink = paymentRequestData.payment_request.longurl;

          const payment = new Payment({
            payReqId: paymentRequestData.payment_request.id,
            name: paymentRequestData.payment_request.buyer_name,
            phone: paymentRequestData.payment_request.phone,
            amount: parseInt(paymentRequestData.payment_request.amount),
            status: paymentRequestData.payment_request.status,
            payLink: paymentLink,
          });
          await payment.save();

          return res.status(200).json({
            paymentLink,
          });
        }
      });
    } catch (error) {
      console.log("Controllers: createPayment - ", error);
    }
  },
};

module.exports = payment;
