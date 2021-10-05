const BaseEntity = require("./base-entity");
const { HttpStatusCode } = require("../ultilities/const/http-code");

class HTTP200ResponseEntity extends BaseEntity {
  constructor(data) {
    super("OK", HttpStatusCode.OK, data);
  }
}

class HTTP201ResponseEntity extends BaseEntity {
  constructor(data) {
    super("CREATED", HttpStatusCode.CREATED, data);
  }
}

module.exports = {
  HTTP200ResponseEntity,
  HTTP201ResponseEntity,
};
