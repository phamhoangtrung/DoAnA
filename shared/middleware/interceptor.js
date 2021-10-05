const {
  HTTP200ResponseEntity,
  HTTP201ResponseEntity,
} = require("../entities/api-entity");
const { HttpMethod } = require("../ultilities/const/http-code");
const { APIDefaultMessage } = require("../ultilities/const/message");

const addResponseData = (req, res, next) => {
  const { data, method } = req;
  if (!data) {
    req.data = APIDefaultMessage[method];
  } else {
    if (typeof data === "string")
      req.data = `${data} ${APIDefaultMessage[method]}`;
  }
  next();
};

const interceptor = ({ method, data }, res) => {
  const caseIgnorCompare = (a, b) => a.toLowerCase() === b.toLowerCase();
  let responseEntity;
  if (caseIgnorCompare(method, HttpMethod.POST)) {
    responseEntity = new HTTP201ResponseEntity(data);
  } else {
    responseEntity = new HTTP200ResponseEntity(data);
  }
  res.status(responseEntity.httpCode).send(responseEntity);
};

module.exports = [addResponseData, interceptor];
