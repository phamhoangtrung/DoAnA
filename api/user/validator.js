const Joi = require("joi");

const validateRegist = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(1024),
    dob: Joi.date(),
    address: {
      city: Joi.string().required().min(5).max(30),
      addr: Joi.string().required().min(5).max(30),
      ward: Joi.string().required().min(5).max(30),
      district: Joi.string().required().min(5).max(30),
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
