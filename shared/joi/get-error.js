const getJoiErrorMessage = (joi) => joi.error.details[0].message;

module.exports = {
  getJoiErrorMessage,
};
