const jwt = require("jsonwebtoken");
const { HTTP401Error } = require("../error/base-error");

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HTTP401Error();

    const [BEARER_TOKEN, JWT_TOKEN] = authorization.split(" ");
    if (BEARER_TOKEN !== "Bearer" || !JWT_TOKEN) throw new HTTP401Error(res);

    const userInfo = jwt.verify(JWT_TOKEN, process.env.API_TOKEN);
    req.userInfo = userInfo;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authMiddleware,
};
