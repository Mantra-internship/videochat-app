const payment = {
  validate: (req, res, next) => {
    try {
      const { name, phone, amount } = req.body;

      if (!name || !phone || !amount) {
        return res.status(500).json({
          message: "Please fill all the fields",
        });
      } else if (isNaN(amount)) {
        return res.status(500).json({
          message: "Amount must be a number",
        });
      } else if (phone.length !== 10) {
        return res.status(500).json({
          message: "Phone number must be 10 digits",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
      console.log(error);
    }
  },
};

module.exports = payment;
