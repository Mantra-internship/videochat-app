const router = require("express").Router();
const paymentRoutes = require("./payment");
const userRoutes = require("./user");

router.use("/payment", paymentRoutes);
router.use("/user", userRoutes);

module.exports = router;
