const Cart = require('./schema');
const {} = require('./validator');
const {badRequest} = require('../../shared/error/error');

module.exports = {
  async all(req, res) {
    try {
      const carts = await Cart.find();
      res.send(req.userInfo);
    } catch (err) {
      badRequest(res);
    }
  },

  async one({params: {id}}, res) {
    try {
      const cart = await Cart.findById(id);
      res.send(cart);
    } catch (err) {
      badRequest(res);
    }
  },

  async update({body, params}, res) {
    try {
      const id = params.id;
      const cart = await Cart.findOneAndUpdate(id, body);
      res.send(cart);
    } catch (err) {
      badRequest(res);
    }
  },

  async delete({params}, res) {
    try {
      const id = params.id;
      const cart = await Cart.findByIdAndDelete(id);
      res.send(cart);
    } catch (err) {
      badRequest(res);
    }
  },

  async add({body}, res) {
    try {
      const cart = await Cart.create(body);
      res.send(cart);
    } catch (err) {
      badRequest(res);
    }
  },
};
