const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

const HttpMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

module.exports = { HttpStatusCode, HttpMethod };
