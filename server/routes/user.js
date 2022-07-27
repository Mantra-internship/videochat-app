const router = require("express").Router();
const userMid = require("../middlewares/user");
const userCont = require("../controllers/user");

router
    .route("/get-otp")
    .post(userMid.validate, userCont.getOtp);

router
    .route("/verify-otp")
    .post(userMid.validate, userCont.verifyOtp);

router
    .route("/add-user")
    .post(userCont.saveUser);

router
    .route("/astrologer/:phone")
    .get(userCont.getAstrologer);

router
    .route("/astrologers").get(userCont.getAstrologers);

// For testing
// router
//     .route("/payment-record")
//     .post(userCont.userPaymentRecord);

router
    .route("/payment-record")
    .post(userMid.authenticate, userCont.userPaymentRecord);

router
    .route("/delete/:phone")
    .post(userCont.deleteUser);

router
    .route("/verify-delete")
    .post(userCont.verifyDeleteOtp);

module.exports = router;
