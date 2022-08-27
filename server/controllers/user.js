const User = require('../models/user');
const AstrologerInfo = require('../models/astrologerInfo');
const Payment = require('../models/payment');
const twilio = require('../utils/twilio');
const { generateToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const user = {
  // For Login
  getOtp: async (req, res) => {
    try {
      const { phone } = req.body;
      const otp = Math.floor(Math.random() * 8999) + 1000;
      const user = await User.findOne({ phone });

      if (user) {
        user.otp = otp;
        user.save();
        // setting cookie for getting user's phone in verify otp with 15 minutes limit
        res.cookie('uPhone', phone, { expires: new Date(Date.now() + 900000) });
      } else {
        console.log('User not found');
        return res.status(500).json({
          message: 'Something went wrong',
        });
      }

      // Send OTP to user
      try {
        if (process.env.NODE_ENV === 'production' || phone === '+919876920532') {
          const msg = await twilio.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
          });
        } else {
          console.log(otp);
        }
      } catch (error) {
        console.log('Twilio message sent error - ', error);
        return res.status(500).json({
          message: 'Something went wrong',
        });
      }

      return res.status(200).json({
        message: 'OTP sent successfully',
      });
    } catch (error) {
      console.log('Controllers: getOtp - ', error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },

  // For Registration
  registerGetOtp: async (req, res) => {
    try {
      const { name, phone, email, role } = req.body;
      const otp = Math.floor(Math.random() * 8999) + 1000;

      const foundUser = await User.findOne({ phone });
      console.log(foundUser);
      if (foundUser) {
        return res.status(400).json({
          message: `User with entered phone number already exists`,
        });
      } else {
        const newUser = new User({
          name,
          phone,
          email,
          role,
          otp,
          credits: 10,
        });
        res.cookie('uPhone', phone, { expires: new Date(Date.now() + 900000) });
        await newUser.save();
      }

      // For sending OTP
      try {
        if (process.env.NODE_ENV === 'production' || phone === '+919876920532') {
          const msg = await twilio.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
          });
        } else {
          console.log(otp);
        }
        return res.status(200).json({
          message: 'OTP sent successfully',
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Something went wrong',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { phone, otp } = req.body;

      const user = await User.findOne({ phone });

      let action = '';

      if (user) {
        const approved = user.approved;
        if (user.otp === otp) {
          user.otp = null;
          user.approved = true;
          await user.save();
          const token = generateToken(user.id);
          if (approved) {
            action = 'login';
          } else {
            action = 'register';
          }
          res.cookie('user', token);
          return res.status(200).json({
            message: 'OTP verified successfully',
            token,
            role: user.role,
            action,
          });
        } else {
          return res.status(400).json({
            message: 'OTP is incorrect',
          });
        }
      } else {
        return res.status(404).json({
          message: 'User with this phone number does not exist',
        });
      }
    } catch (error) {
      console.log('Controllers: verifyOtp - ', error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },

  addAstrologerDetails: async (req, res) => {
    try {
      const userId = req.userId;
      const foundUser = await User.findOne({ _id: userId });

      if (foundUser.role !== 'astrologer') {
        return res.status(400).json({
          message: 'Entered user is not an astrologer',
        });
      } else if (foundUser.astrologerInfo !== null) {
        return res.status(400).json({
          message: 'Entered user already has astrologer details saved',
        });
      }

      const roomId = foundUser._id;

      const { description, languages, specialities, experience } = req.body;

      const newAstrologerInfo = new AstrologerInfo({
        description,
        languages,
        specialities,
        experience,
        userId,
        roomId,
      });

      const savedInfo = await newAstrologerInfo.save();
      foundUser.astrologerInfo = savedInfo._id;
      await foundUser.save();

      return res.status(200).json({
        message: 'Details saved successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'something went wrong',
      });
    }
  },

  userPaymentRecord: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findOne({ _id: userId });
      const paymentRecord = await Payment.find({ phone: user.phone });
      return res.status(200).json({
        message: 'Payment record fetched successfully',
        paymentRecord,
      });
    } catch (error) {
      console.log('Controllers: userPaymentRecord - ', error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },
  // to fetch data of all astrologers
  getAstrologers: async (req, res) => {
    try {
      await User.find({ role: 'astrologer' }, (error, astrologers) => {
        if (error) {
          return res.status(404).json({ message: 'astrologers not found' });
        } else if (astrologers && astrologers.length > 0) {
          return res.status(200).json(astrologers);
        } else {
          return res.status(404).json({ message: 'astrologers not found' });
        }
      }).clone();
    } catch (err) {
      // console.log(err)
      return res.status(500).json({ message: 'something went wrong' });
    }
  },

  // For profile
  getUser: async (req, res) => {
    try {
      const userId = req.userId;
      const foundUser = await User.findOne({ _id: userId });

      if (foundUser) {
        if (
          foundUser.role === 'astrologer' &&
          foundUser.astrologerInfo !== null
        ) {
          await foundUser.populate('astrologerInfo');
        }
      } else {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      return res.status(200).json({
        foundUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },

  // to save an individual user in DB
  updateUser: async (req, res) => {
    try {
      const userID = req.userId;
      const { name, email, role, profilePic } = req.body;
      const user = await User.findOne({ _id: userID });

      if (user) {
        user.name = name;
        user.email = email;
        user.profilePic = profilePic;

        if (role === 'user') {
          user.astrologerInfo = null;
          if (user.role === 'astrologer') {
            await AstrologerInfo.findOneAndDelete({ userId: user._id });
            user.role = 'user';
          }
        } else if (user.role === 'astrologer') {
          const { description, languages, specialities, experience } = req.body;
          const foundInfo = await AstrologerInfo.findOne({ userId: user._id });

          if (foundInfo) {
            (foundInfo.description = description),
              (foundInfo.languages = languages),
              (foundInfo.specialities = specialities),
              (foundInfo.experience = experience),
              await foundInfo.save();
          } else {
            user.role = 'user';
            await user.save();
            return res.status(500).json({
              message: 'Something went wrong, Please try again',
            });
          }
        } else {
          const { description, languages, specialities, experience } = req.body;
          const newAstrologerInfo = new AstrologerInfo({
            userId: user._id,
            description,
            languages,
            specialities,
            experience,
          });
          const savedInfo = await newAstrologerInfo.save();
          user.role = 'astrologer';
          user.astrologerInfo = savedInfo._id;
        }

        await user.save();
        return res.status(200).json({
          message: 'User Saved Successfully',
        });
      } else {
        return res.status(404).json({
          message: 'User does not exist',
        });
      }
    } catch (error) {
      console.log('Controllers: updateUser - ', error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },
  // to get data of an individual astrologer
  getAstrologer: async (req, res) => {
    try {
      const { phone } = req.params;
      await User.findOne({ role: 'astrologer', phone }, async (error, astrologer) => {
        
        if (error) {
          return res.status(500).json({ message: 'something went wrong' });
        } else if (astrologer) {
           if (astrologer.role === 'astrologer' && astrologer.astrologerInfo !== null) {
              await astrologer.populate('astrologerInfo');
          }
          return res.status(200).json(astrologer);
        } else {
          return res.status(404).json({ message: 'astrologer not found' });
        }
      }).clone();
    } catch (err) {
      return res.status(400).json({ message: 'something went wrong' });
    }
  },

  // To be modified
  deleteUser: async (req, res) => {
    try {
      const { phone } = req.params;
      otp = Math.floor(Math.random() * 8999) + 1000;
      const user = await User.findOne({ phone });
      if (user) {
        user.otp = otp;
        await user.save();
      } else {
        return res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }

    try {
      if (process.env.NODE_ENV === 'production') {
        await twilio.messages.create({
          body: `Your OTP for account deletion is ${otp}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
        });
      } else {
        console.log(otp);
      }
      return res.status(200).json({
        message: 'OTP sent successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Not able to send otp at the moment',
      });
    }
  },

  verifyDeleteOtp: async (req, res) => {
    try {
      const { otp, phone } = req.body;
      const user = await User.findOne({ phone });
      if (user) {
        if (otp == user.otp) {
          await user.delete();
          return res.status(200).json({
            message: 'User deleted successfully',
          });
        } else {
          return res.status(400).json({
            message: 'Incorrect OTP',
          });
        }
      } else {
        return res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },
  getTransactionDetail: async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const userId = req.userId;
      await User.findOne({ _id: userId }, async (err, foundUser) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Something went wrong',
          });
        } else if (foundUser) {
          await Payment.findOne({ paymentId }, (err, foundTransaction) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: 'Something went wrong',
              });
            } else if (foundTransaction) {
              console.log(foundTransaction);
              return res.status(200).json(foundTransaction);
            } else {
              return res.status(404).json({
                message: 'Payment record not found',
              });
            }
          }).clone();
        } else {
          return res.status(404).json({
            message: 'User not found',
          });
        }
      }).clone();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },

  dualGetOtp: async (req, res) => {
    try {
      const userId = req.userId;
      const { newPhone } = req.body;

      if (!newPhone) {
        return res.status(400).json({
          message: 'Please fill all the fields',
        });
      }

      const foundUser = await User.findOne({ _id: userId });
      const otp = Math.floor(Math.random() * 8999) + 1000;
      const tempPhoneOtp = Math.floor(Math.random() * 8999) + 1000;

      if (foundUser) {
        foundUser.tempPhone = newPhone;
        foundUser.tempPhoneOtp = tempPhoneOtp;
        foundUser.otp = otp;
        await foundUser.save();
      } else {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      try {
        if (process.env.NODE_ENV === 'production') {
          const defaultPhoneMsg = await twilio.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: foundUser.phone,
          });
          const tempPhoneMsg = await twilio.messages.create({
            body: `Your OTP is ${tempPhoneOtp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: newPhone,
          });
        } else {
          console.log(otp);
          console.log(tempPhoneOtp);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Unable to send OTP at the moment',
        });
      }

      return res.status(200).json({
        message: 'OTPs sent successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },

  dualVerifyOtp: async (req, res) => {
    try {
      const userId = req.userId;
      const { oldPhoneOtp, newPhoneOtp } = req.body;

      if (!oldPhoneOtp || !newPhoneOtp) {
        return res.status(400).json({
          message: 'Please fill all the OTP fields',
        });
      }

      const foundUser = await User.findOne({ _id: userId });

      if (foundUser) {
        if (
          foundUser.otp === oldPhoneOtp &&
          foundUser.tempPhoneOtp === newPhoneOtp
        ) {
          foundUser.prevPhone = foundUser.phone;
          foundUser.phone = foundUser.tempPhone;
          foundUser.tempPhone = foundUser.otp = foundUser.tempPhoneOtp = null;
          await foundUser.save();
          return res.status(200).json({
            message: 'Phone number updated successfully',
          });
        } else {
          return res.status(401).json({
            message: 'Incorrect OTP',
          });
        }
      } else {
        return res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },

  getTimer: async (req, res) => {
    try {
      const userId = req.userId;
      const { roomId } = req.body;
      const foundUser = await User.findById({ _id: userId });

      // Just incase to check if object is malformed
      if (foundUser && foundUser.name && foundUser.credits >= 0) {

        const eTime = roomId === userId && foundUser.role === 'astrologer' ? 
          (new Date().getTime() / 1000 + 72000)
          :
          (new Date().getTime() / 1000 + foundUser.credits * 60 + 5)
        
        const tokenObj = {
          name: foundUser.name,
          role: foundUser.role,
          id: userId,
          credits: foundUser.credits,
          eTime,
          phone: foundUser.phone,
        };

        return res.status(200).json({ tokenObj });
      } else {
        return res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }
  },
  creditSaver: async (req, res) => {
    const { eTime, leaveTime, currentUser } = req.body;

    console.log({ eTime, leaveTime, currentUser });

    try {
      if (leaveTime && currentUser) {
        console.log('inside if');
        const leavingUser = await User.findOne({ name: currentUser });
        console.log('leavingUser : ' + leavingUser);

        // ! error handling yet to be implemented
        if (leavingUser) {
          let credits = leavingUser.credits;
          if (eTime - leaveTime <= 0) credits = 0;
          else {
            credits = Math.ceil((eTime - leaveTime) / 60);
          }
          if (credits <= leavingUser.credits) {
            leavingUser.credits = credits;
            await leavingUser.save();
          }
          return res
            .status(200)
            .json({ message: 'user credits successfully saved' });
        }
        return req.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error saving user credits' });
    }
  },
};

module.exports = user;
