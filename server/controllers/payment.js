const Insta = require("../utils/payment");

const payment = {
  createPayment: (req, res) => {
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

    Insta.createPayment(data, function (error, response) {
      if (error) {
        console.log("Create payment error - ", error);
      } else {
        const paymentRequestData = JSON.parse(response);
        payreqid = paymentRequestData.payment_request.id;
        paymentLink = paymentRequestData.payment_request.longurl;

        return res.status(200).json({
          paymentLink,
        });
      }
    });
  },
};

module.exports = payment;
