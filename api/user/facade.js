const User = require("./schema");
const { validateRegist, validateLogin } = require("./validator");
const errorFactory = require("../../shared/error/error");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async all(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async one({ params: { id } }, res) {
    try {
      const User = await User.findById(id);
      res.send(User);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async update({ body, params }, res) {
    try {
      const id = params.id;
      const User = await User.findOneAndUpdate(id, body);
      res.send(User);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async delete({ params }, res) {
    try {
      const id = params.id;
      const users = await User.findByIdAndDelete(id);
      res.send(users);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async regist({ body }, res) {
    try {
      // Validate required body
      const validUser = validateRegist(body);
      if (validUser.error) {
        const { message } = validUser.error.details[0];
        const error = errorFactory.BAD_REQUEST(message);
        return res.status(error.statusCode).send(error);
      }

      // Validate email exist in DB
      const query = { email: body.email };
      const emailExist = await User.findOne(query);
      if (emailExist) {
        const error = errorFactory.BAD_REQUEST("Email already exist");
        return res.status(error.statusCode).send(error);
      }

      // Hashing password
      const hashPassword = await bcryptjs.hash(body.password, 10);
      body.password = hashPassword;
      const users = await User.create(body);
      res.send(users);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async login({ body }, res) {
    try {
      const validUser = valiDateLogin(body);
      // Validate required body
      if (validUser.error) {
        const { message } = validUser.error.details[0];
        const error = errorFactory.BAD_REQUEST(message);
        return res.status(error.statusCode).send(error);
      }

      // Validate email exist in DB
      const query = { email: body.email };
      const user = await User.findOne(query);
      if (!user) {
        const error = errorFactory.BAD_REQUEST("Invalid email");
        return res.status(error.statusCode).send(error);
      }

      // Validate password
      const vailidPassword = await bcryptjs.compare(
        body.password,
        user.password
      );
      if (!vailidPassword) {
        const error = errorFactory.BAD_REQUEST("Invalid password");
        return res.status(error.statusCode).send(error);
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.API_TOKEN);
      res.send(token);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },
};
