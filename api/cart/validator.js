const Validator = require("../../shared/ultilities/validator");

const validate = (body) => {
  const schema = {
    name: new Validator(body.name, "name").error,
    desc: new Validator(body.desc, "description").error,
  };
  return Validator.validate(schema);
};

module.exports = {
  validate,
};
