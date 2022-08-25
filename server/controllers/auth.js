const User = require('../models/user');

const auth = {
  idReturner: async (req, res) => {
    try {
      console.log(req.userId)
      const userId = req.userId;
      const user = await User.findOne({ _id: userId })
      return res.status(200).json({
        isAuthenticated: true,
        userId: userId,
        user: user
      });
    }catch(error){
      console.log(error);
      return res.status(500).json({
        isAuthenticated: false,    // just to be safe
        message: "something went wrong"
      });
    }
  },
};

module.exports = auth;