module.exports = {
  badRequest(res, message = 'Bad Request') {
    const statusCode = 400;
    const error = 'Bad Request';
    res.status(statusCode).send({statusCode, error, message});
  },

  unauthoried(res, message = 'Unauthoried') {
    const statusCode = 401;
    const error = 'Unauthoried';
    res.status(statusCode).send({statusCode, error, message});
  },
  notFound(res, message = 'Not Found') {
    const statusCode = 404;
    const error = 'Not Found';
    res.status(statusCode).send({statusCode, error, message});
  },
};
