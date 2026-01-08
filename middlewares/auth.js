const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");


module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { UnauthorizedError } = require('../errors');

if (!authorization || !authorization.startsWith('Bearer ')) {
  return next(new UnauthorizedError('Authorization required'));
}


  if (!authorization || !authorization.startsWith("Bearer ")) {
    const err = new Error("Authorization required");
    err.statusCode = UNAUTHORIZED;
    return next(err);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (e) {
    const err = new Error("Authorization required");
    err.statusCode = UNAUTHORIZED;
    return next(err);
  }
};
