// middleware is a function that has access to the req and res cycle and object so every time we hit an endpoint we can fire off middleware and check if there's a token in the header

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // set user in that's in payload to request a user so we'll have access to this inside the route
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
