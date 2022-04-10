const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user from token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (e) {
      console.log("Error in protect jwt token" + e);
      console.log("User not authorized");
    }
  }

  if (!token) {
    res.status(401).json("Not authorized, no token produced");
  }
};

module.exports = {
  protect,
};
