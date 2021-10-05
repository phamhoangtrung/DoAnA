const { HTTP500Error, HTTP404Error } = require("../error/api-error");

const sendErrorResponse = (res, err) => res.status(err.httpCode).send(err);

const handleError = (err, res, next) => {
  try {
    if (!err.httpCode) throw new HTTP500Error(err.message);
    sendErrorResponse(res, err);
  } catch (err) {
    next(err);
  }
};

const mongooseErrorHandler = (err, req, res, next) => {
  try {
    if (err.kind) throw new HTTP404Error();
    else next(err);
  } catch (err) {
    next(err);
  }
};

const clientErrorHandler = (err, req, res, next) => {
  handleError(err, res, next);
};

const serverErrorHandler = (err, req, res, next) => {
  sendErrorResponse(res, err);
};

module.exports = [mongooseErrorHandler, clientErrorHandler, serverErrorHandler];
