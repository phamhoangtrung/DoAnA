const User = require('./schema');
const {validateRegist, validateLogin} = require('./validator');
const {badRequest} = require('../../shared/error/error');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async all(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      badRequest(res, err.message);
    }
  },

  async one({params: {id}}, res) {
    try {
      const User = await User.findById(id);
      res.send(User);
    } catch (err) {
      badRequest(res, err.message);
    }
  },

  async update({body, params}, res) {
    try {
      const id = params.id;
      const User = await User.findOneAndUpdate(id, body);
      res.send(User);
    } catch (err) {
      badRequest(res, err.message);
    }
  },

  async delete({params}, res) {
    try {
      const id = params.id;
      const users = await User.findByIdAndDelete(id);
      res.send(users);
    } catch (err) {
      badRequest(res, err.message);
    }
  },

  async regist({body}, res) {
    try {
      // Validate required body
      const validUser = validateRegist(body);
      if (validUser.error) badRequest(res, validUser.error.details[0].message);

      // Validate email exist in DB
      const query = {email: body.email};
      const emailExist = await User.findOne(query);
      if (emailExist) return badRequest(res, 'Email already exist');

      // Hashing password
      const hashPassword = await bcryptjs.hash(body.password, 10);
      body.password = hashPassword;
      const users = await User.create(body);
      res.send(users);
    } catch (err) {
      badRequest(res, err.message);
    }
  },

  async login({body}, res) {
    try {
      const validUser = validateLogin(body);
      // Validate required body
      if (validUser.error) badRequest(res, validUser.error.details[0].message);

      // Validate email exist in DB
      const query = {email: body.email};
      const user = await User.findOne(query);
      if (!user) return badRequest(res, 'Invalid email');

      // Validate password
      const vailidPassword = await bcryptjs.compare(
        body.password,
        user.password
      );
      if (!vailidPassword) return badRequest(res, 'Invalid password');

      // Generate JWT
      const token = jwt.sign({id: user._id}, process.env.API_TOKEN);
      res.send(token);
    } catch (err) {
      badRequest(res);
    }
  },
};
