const Joi = require("joi");
const { minmax } = require("../../shared/joi/get-validator");

const validate = (body) => {
  const schema = Joi.object({
    name: minmax(),
    desc: minmax({ min: 20, max: 1024 }),
  });
  return schema.validate(body);
};
module.exports = {
  validate,
};
