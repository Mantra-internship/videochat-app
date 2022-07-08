const { verifyAuthToken } = require("../utils/auth");

const user = {
  validate: (req, res, next) => {
    try {
      const { phone, name } = req.body;
      if (!phone || !name) {
        return res.status(500).json({
          message: "Please fill all the fields",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log("Middlewares: UserValidate - ", error);
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  authenticate: async (req, res, next) => {
    try {
      const authToken = req.headers.authorization.split(" ")[1];
      const decodedToken = await verifyAuthToken(authToken);

      if (decodedToken) {
        req.userId = decodedToken.id;
        next();
      } else {
        return res.status(404).json({
          message: "Invalid auth token",
        });
      }
    } catch (error) {
      console.log("Middlewares: UserAuthenticate - ", error);
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = user;
