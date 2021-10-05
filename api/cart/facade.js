const Cart = require("./schema");
const {} = require("./validator");

module.exports = {
  async all(req, res, next) {
    try {
      req.data = await Cart.find();
      next();
    } catch (err) {
      next(err);
    }
  },

  async one({ params: { id } }, res) {
    try {
      req.data = await Cart.findById(id);
      next();
    } catch (err) {
      next(err);
    }
  },

  async update({ body, params: { id } }, res) {
    try {
      await Cart.findOneAndUpdate(id, body);
      next();
    } catch (err) {
      next(err);
    }
  },

  async delete({ params: { id } }, res) {
    try {
      await Cart.findByIdAndDelete(id);
      next();
    } catch (err) {
      next(err);
    }
  },

  async add({ body }, res) {
    try {
      await Cart.create(body);
      next();
    } catch (err) {
      next(err);
    }
  },
};
