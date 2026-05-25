const jwt = require("jsonwebtoken");

// lấy token từ header
const extractToken = (req) => {
  return req.headers.authorization?.split(" ")[1];
};

// verify token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  extractToken,
  verifyToken,
};