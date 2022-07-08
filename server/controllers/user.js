const User = require("../models/user");
const Payment = require("../models/payment");
const twilio = require("../utils/twilio");
const { generateToken } = require("../utils/auth");

const user = {
  getOtp: async (req, res) => {
    try {
      const { name, phone } = req.body;
      let otp = 0;
      while (otp === 0) {
        otp = Math.floor(Math.random() * 10000);
      }

      const user = await User.findOne({ phone });

      if (user) {
        user.otp = otp;
        user.save();
      } else if (!user) {
        const newUser = new User({
          name,
          phone,
          otp,
          credits: 10,
        });
        await newUser.save();
      } else {
        console.log("User not found");
        return res.status(500).json({
          message: "Something went wrong",
        });
      }

      // Send OTP to user
      try {
        if (process.env.NODE_ENV === "production") {
          const msg = await twilio.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
          });
        } else {
          console.log(otp);
        }
      } catch (error) {
        console.log("Twilio message sent error - ", error);
        return res.status(500).json({
          message: "Something went wrong",
        });
      }

      return res.status(200).json({
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.log("Controllers: getOtp - ", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { phone, otp } = req.body;

      const user = await User.findOne({ phone });

      if (user) {
        if (user.otp === otp) {
          user.otp = null;
          user.approved = true;
          await user.save();

          return res.status(200).json({
            message: "OTP verified successfully",
            authToken: generateToken(user.id),
          });
        } else {
          return res.status(400).json({
            message: "OTP is incorrect",
          });
        }
      } else {
        return res.status(404).json({
          message: "User with this phone number does not exist",
        });
      }
    } catch (error) {
      console.log("Controllers: verifyOtp - ", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  userPaymentRecord: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findOne({ _id: userId });
      const paymentRecord = await Payment.find({ phone: user.phone });
      return res.status(200).json({
        message: "Payment record fetched successfully",
        paymentRecord,
      });
    } catch (error) {
      console.log("Controllers: userPaymentRecord - ", error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
};

module.exports = user;
