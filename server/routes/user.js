const router = require("express").Router();
const userMid = require("../middlewares/user");
const userCont = require("../controllers/user");

router.route("/get-otp").post(userMid.validate, userCont.getOtp);

router.route("/verify-otp").post(userMid.validate, userCont.verifyOtp);
router.route("/api/add-user").post(userCont.saveUser);
router.route("/api/astrologer/:phone").post(userCont.getAstrologer);
router.route("/api/astrologers").post(userCont.getAstrologers);
router
  .route("/payment-record")
  .post(userMid.authenticate, userCont.userPaymentRecord);

module.exports = router;
