const Joi = require("joi");

const minmax = ({ min = 5, max = 30 } = {}) =>
  Joi.string().required().max(max).min(min);

module.exports = {
  minmax,
};
