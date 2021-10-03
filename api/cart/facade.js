const Cart = require("./schema");
const {} = require("./validator");
const errorFactory = require("../../shared/error/error");
module.exports = {
  async all(req, res) {
    try {
      const carts = await Cart.find();
      res.send(carts);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async one({ params: { id } }, res) {
    try {
      const cart = await Cart.findById(id);
      res.send(cart);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async update({ body, params }, res) {
    try {
      const id = params.id;
      const cart = await Cart.findOneAndUpdate(id, body);
      res.send(cart);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async delete({ params }, res) {
    try {
      const id = params.id;
      const cart = await Cart.findByIdAndDelete(id);
      res.send(cart);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async add({ body }, res) {
    try {
      const cart = await Cart.create(body);
      res.send(cart);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },
};
