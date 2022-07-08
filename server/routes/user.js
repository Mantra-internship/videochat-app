const router = require("express").Router();
const userMid = require("../middlewares/user");
const userCont = require("../controllers/user");

router.route("/get-otp").post(userMid.validate, userCont.getOtp);

router.route("/verify-otp").post(userMid.validate, userCont.verifyOtp);

router
  .route("/payment-record")
  .post(userMid.authenticate, userCont.userPaymentRecord);

module.exports = router;
