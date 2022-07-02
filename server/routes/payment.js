const router = require("express").Router();
const paymentCont = require("../controllers/payment");
const paymentMid = require("../middlewares/payment");

router
  .route("/create-payment")
  .post(paymentMid.validate, paymentCont.createPayment);

module.exports = router;
