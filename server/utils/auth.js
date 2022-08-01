const jwt = require("jsonwebtoken");

module.exports.generateToken = (id) => {
  console.log(id);
  const token = jwt.sign({ id }, process.env.AUTH_SECRET, { expiresIn: "24h" });
  return token;
};

module.exports.verifyAuthToken = async (authToken) => {
  try {
    const decodedToken = await jwt.verify(authToken, process.env.AUTH_SECRET);
    console.log(decodedToken);
    return decodedToken;
  } catch (error) {
    console.log("Utils: Auth token verification failed - ", error);
    return false;
  }
};
