const User = require("./schema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateRegist, validateLogin } = require("./validator");
const { HTTP401Error } = require("../../shared/error/api-error");
const { getJoiErrorMessage } = require("../../shared/joi/get-error");
const req = require("express/lib/request");

const genToken = (id) => jwt.sign({ id }, process.env.API_TOKEN);

module.exports = {
  async all(req, res, next) {
    try {
      req.data = await User.find();
      next();
    } catch (err) {
      next(err);
    }
  },

  async one({ params: { id } }, res, next) {
    try {
      req.data = await User.findById(id);
      next();
    } catch (err) {
      next(err);
    }
  },

  async update({ body, params: { id } }, res, next) {
    try {
      await User.findOneAndUpdate(id, body);
      next();
    } catch (err) {
      next(err);
    }
  },

  async delete({ params: id }, res, next) {
    try {
      await User.findByIdAndDelete(id);
      next();
    } catch (err) {
      next(err);
    }
  },

  async regist({ body }, res, next) {
    try {
      // Validate required body
      const validUser = validateRegist(body);
      if (validUser.error)
        throw new HTTP401Error(getJoiErrorMessage(validUser));

      // Validate email exist in DB
      const query = { email: body.email };
      const emailExist = await User.findOne(query);
      if (emailExist) throw new HTTP401Error("Email already exist");

      // Hashing password
      const hashPassword = await bcryptjs.hash(body.password, 10);
      body.password = hashPassword;
      const user = await User.create(body);
      const token = genToken(user._id);
      req.data = token;
      next();
    } catch (err) {
      next(err);
    }
  },

  async login({ body }, res, next) {
    try {
      const validUser = validateLogin(body);
      // Validate required body
      if (validUser.error)
        throw new HTTP401Error(getJoiErrorMessage(validUser));

      // Validate email exist in DB
      const query = { email: body.email };
      const user = await User.findOne(query);
      if (!user) throw new HTTP401Error("Invalid email");

      // Validate password
      const vailidPassword = await bcryptjs.compare(
        body.password,
        user.password
      );
      if (!vailidPassword) throw new HTTP401Error("Invalid password");

      // Generate JWT
      const token = genToken(user._id);
      req.data = token;
      next();
    } catch (err) {
      next(err);
    }
  },
};
