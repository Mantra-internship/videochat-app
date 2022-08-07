
const auth = {
  idReturner: async (req, res) => {
    try{
      return res.status(200).json({
        isAuthenticated: true,
        userId: req.userId
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