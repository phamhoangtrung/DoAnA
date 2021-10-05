const BaseError = require("./base-error");

const { HttpStatusCode } = require("../ultilities/const/http-code");

class HTTP400Error extends BaseError {
  constructor(message = "bad request") {
    super("Bad Request", HttpStatusCode.BAD_REQUEST, message);
  }
}
class HTTP401Error extends BaseError {
  constructor(message = "unauthorized") {
    super("Unauthorized", HttpStatusCode.UNAUTHORIZED, message);
  }
}
class HTTP404Error extends BaseError {
  constructor(message = "not found") {
    super("Not Found", HttpStatusCode.NOT_FOUND, message);
  }
}
class HTTP500Error extends BaseError {
  constructor(message = "internal server") {
    super("Internal Server", HttpStatusCode.INTERNAL_SERVER, message);
  }
}

module.exports = {
  HTTP400Error,
  HTTP401Error,
  HTTP404Error,
  HTTP500Error,
};
