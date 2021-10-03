const jwt = require('jsonwebtoken');
const {unauthoried, badRequest} = require('../error/error');

const authMiddleware = (req, res, next) => {
  try {
    const {authorization} = req.headers;
    if (!authorization) return unauthoried(res);

    const [BEARER_TOKEN, JWT_TOKEN] = authorization.split(' ');
    if (BEARER_TOKEN !== 'Bearer' || !JWT_TOKEN) return unauthoried(res);

    const userInfo = jwt.verify(JWT_TOKEN, process.env.API_TOKEN);
    req.userInfo = userInfo;
    next();
  } catch (error) {
    badRequest(res);
  }
};

module.exports = {
  authMiddleware,
};
