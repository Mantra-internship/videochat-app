const router = require("express").Router();
const paymentRoutes = require("./payment");

router.use("/payment", paymentRoutes);

module.exports = router;
