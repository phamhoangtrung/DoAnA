class BaseError extends Error {
  constructor(name, httpCode, message) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.errorMessage = this.message;
  }
}

module.exports = BaseError;
