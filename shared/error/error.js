module.exports = {
  BAD_REQUEST(message = "Bad Request") {
    const statusCode = 400;
    const error = "Bad Request";
    return { statusCode, error, message };
  },

  UNAUTHORIED(message = "Unauthoried") {
    const statusCode = 401;
    const error = "Unauthoried";
    return { statusCode, error, message };
  },
  NOT_FOUND(message = "Not Found") {
    const statusCode = 404;
    const error = "Not Found";
    return { statusCode, error, message };
  },
};
