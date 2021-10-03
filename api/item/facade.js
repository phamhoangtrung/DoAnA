const Item = require("./schema");
const {} = require("./validator");
const errorFactory = require("../../shared/error/error");
module.exports = {
  async all(req, res) {
    try {
      const items = await Item.find();
      res.send(items);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async one({ params: { id } }, res) {
    try {
      const item = await Item.findById(id);
      res.send(item);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async update({ body, params }, res) {
    try {
      const id = params.id;
      const item = await Item.findOneAndUpdate(id, body);
      res.send(item);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async delete({ params }, res) {
    try {
      const id = params.id;
      const items = await Item.findByIdAndDelete(id);
      res.send(items);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },

  async add({ body }, res) {
    try {
      const items = await Item.create(body);
      res.send(items);
    } catch (err) {
      const error = errorFactory.BAD_REQUEST(err.message);
      res.status(error.statusCode).send(error);
    }
  },
};
