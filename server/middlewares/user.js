const { verifyAuthToken } = require("../utils/auth");

const user = {
  validate: (req, res, next) => {
    try {
      const { phone } = req.body;
      if (!phone) {
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

  registerValidate: (req, res, next) => {
    try {
      const { name, phone, email, role } = req.body;
      if(!name || !phone || !email || !role){
        return res.status(500).json({
          message: "Please fill all the mandatory fields",
        })
      }else{
        next();
      }
    } catch(error) {
      return res.status(500).json({
        // message: "Something went wrong"
        message: error.message,
      })
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
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.log("Middlewares: UserAuthenticate - ", error);
      return res.status(500).json({
        message: error.message,
        isAuthenticated: false,
      });
    }
  },
};

module.exports = user;
