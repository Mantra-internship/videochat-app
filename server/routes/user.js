const router = require("express").Router();
const userMid = require("../middlewares/user");
const userCont = require("../controllers/user");
const authCont = require("../controllers/auth");

router
    .route("/get-otp")
    .post(userMid.validate, userCont.getOtp);

router
    .route("/verify-otp")
    .post(userMid.validate, userCont.verifyOtp);

router
    .route("/register/get-otp")
    .post(userMid.registerValidate, userCont.registerGetOtp);

router
    .route("/authenticate-user")
    .post(userMid.authenticate, authCont.idReturner);

router
    .route("/astrologer/:phone")
    .get(userCont.getAstrologer);

router
    .route("/astrologers")
    .get(userCont.getAstrologers);

router
    .route("/add-astrologer-info")
    .post(userMid.authenticate, userCont.addAstrologerDetails);

router
    .route("/get-user")
    .post(userMid.authenticate, userCont.getUser);

router
    .route("/user/update")
    .post(userMid.authenticate , userCont.updateUser);

router
    .route("/phone-update")
    .post(userMid.authenticate , userCont.dualGetOtp);

router
    .route("/phone-update-verify")
    .post(userMid.authenticate , userCont.dualVerifyOtp);

// For testing
// router
//     .route("/payment-record")
//     .post(userCont.userPaymentRecord);

router
    .route("/payment-record")
    .post(userMid.authenticate, userCont.userPaymentRecord);

router
    .route("/getPaymentInfo/:paymentId")
    .post(userMid.authenticate, userCont.getTransactionDetail);

router
    .route("/delete/:phone")
    .post(userCont.deleteUser);

router
    .route("/verify-delete")
    .post(userCont.verifyDeleteOtp);

module.exports = router;
