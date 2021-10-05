const Item = require("./schema");
const { validate } = require("./validator");
const {
  HTTP404Error,
  HTTP400Error,
  HTTP401Error,
} = require("../../shared/error/api-error");
const { getJoiErrorMessage } = require("../../shared/joi/get-error");
const req = require("express/lib/request");

module.exports = {
  async all(req, res, next) {
    try {
      const items = await Item.find();
      req.data = items;
      next();
    } catch (err) {
      next(err);
    }
  },

  async one({ params: { id } }, res, next) {
    try {
      const item = await Item.findById(id);
      if (!item) throw new HTTP400Error("No Item Founded");
      req.data = item;
      next();
    } catch (err) {
      next(err);
    }
  },

  async update({ body, params: { id } }, res, next) {
    try {
      if (!id) throw new HTTP400Error("No Parameter");

      const validatedBody = validate(body);
      if (validatedBody.error)
        throw new HTTP400Error(getJoiErrorMessage(validatedBody));

      const item = await Item.findByIdAndUpdate(id, body);
      req.data = item.id;
      next();
    } catch (err) {
      next(err);
    }
  },

  async delete({ params: { id } }, res, next) {
    try {
      const item = await Item.findByIdAndDelete(id);
      req.data = item.id;
      next();
    } catch (err) {
      next(err);
    }
  },

  async add({ body }, res, next) {
    try {
      const validatedBody = validate(body);
      if (validatedBody.error)
        throw new HTTP400Error(getJoiErrorMessage(validatedBody));

      const item = await Item.create(body);
      req.data = item.id;
      next();
    } catch (err) {
      next(err);
    }
  },
};
