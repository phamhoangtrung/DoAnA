class BaseEntity {
  constructor(name, httpCode, data) {
    this.httpCode = httpCode;
    this.name = name;
    this.data = data;
  }
}

module.exports = BaseEntity;
