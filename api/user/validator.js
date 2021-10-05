const Joi = require("joi");
const { minmax } = require("../../shared/joi/get-validator");

const validateRegist = (body) => {
  const schema = Joi.object({
    name: minmax(),
    email: Joi.string().required().email(),
    password: minmax({ max: 1024 }),
    dob: Joi.date(),
    address: {
      city: minmax(),
      addr: minmax(),
      ward: minmax(),
      district: minmax(),
    },
    phone: Joi.string()
      .required()
      .pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
  });
  return schema.validate(body);
};

const validateLogin = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(body);
};

module.exports = {
  validateRegist,
  validateLogin,
};
