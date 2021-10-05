const express = require("express");
const { HTTP400Error, HTTP401Error } = require("../../shared/error/api-error");
const { HttpMethod } = require("../../shared/ultilities/const/http-code");
const router = express.Router();
const itemFacade = require("./facade");

const nonRouteMatchMiddleware = ({ method }, res, next) => {
  throw new HTTP400Error("No Route Match");
};

router.get("/", itemFacade.all);
router.get("/:id", itemFacade.one);

router.post("/", itemFacade.add);
router.post("/:id", nonRouteMatchMiddleware);

router.put("/", nonRouteMatchMiddleware);
router.put("/:id", itemFacade.update);

router.delete("/", nonRouteMatchMiddleware);
router.delete("/:id", itemFacade.delete);

module.exports = router;
