const Insta = require("../utils/payment");
const Payment = require("../models/payment");
const User = require("../models/user");

const payment = {
  createPayment: async (req, res) => {
    try {
      const userId = req.userId;
      const amount = req.body.amount;
      console.log(userId);
      const user = await User.findById(userId);
      if (user) {
        const data = new Insta.PaymentData();

        data.setRedirectUrl(process.env.REDIRECT_URL); // Store payment details
        data.send_sms = "True";
        // data.send_email = "True";
        // data.email = user.email;
        data.purpose = "Test";
        data.amount = amount;
        data.buyer_name = user.name;
        data.phone = user.phone;

        Insta.createPayment(data, async (error, response) => {
          if (error) {
            console.log("Create payment error - ", error);
          } else {
            const paymentRequestData = JSON.parse(response); // JSON
            console.log(paymentRequestData);

            const payment = new Payment({
              paymentRequestId: paymentRequestData.payment_request.id,
              name: paymentRequestData.payment_request.buyer_name,
              phone: paymentRequestData.payment_request.phone,
              amount: parseInt(paymentRequestData.payment_request.amount),
              paymentRequestStatus: paymentRequestData.payment_request.status,
              paymentLink: paymentRequestData.payment_request.longurl,
            });
            await payment.save();

            return res.status(200).json({
              paymentLink: paymentRequestData.payment_request.longurl,
            });
          }
        });
      } else {
        return res.status(500).json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log("Controllers: createPayment - ", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  getPaymentDetails: async (req, res) => {
    try {
      const paymentId = req.query.payment_id;
      const paymentRequestId = req.query.payment_request_id;

      Insta.getPaymentDetails(
        paymentRequestId,
        paymentId,
        async (error, response) => {
          if (error) {
            console.log("Get payment details error - ", error);
          } else {
            console.log(response);
            const paymentDetails = await Payment.findOne({
              paymentRequestId: response.payment_request.id,
            });

            console.log(paymentDetails);

            if (paymentDetails) {
              paymentDetails.paymentRequestId = response.payment_request.id;
              paymentDetails.paymentId =
                response.payment_request.payment.payment_id;
              paymentDetails.paymentRequestStatus =
                response.payment_request.status;
              paymentDetails.paymentStatus =
                response.payment_request.payment.status;
              paymentDetails.paymentRequestCreatedAt =
                response.payment_request.created_at;
              paymentDetails.paymentCreatedAt =
                response.payment_request.payment.created_at;
              paymentDetails.currency =
                response.payment_request.payment.currency;

              await paymentDetails.save();

              return res.status(200).json({
                paymentDetails,
              });
            } else {
              return res.status(500).json({
                message: "Payment not found",
              });
            }
          }
        }
      );
    } catch (error) {
      console.log("Controllers: getPaymentDetails - ", error);
    }
  },
};

module.exports = payment;
