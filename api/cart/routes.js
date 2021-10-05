const express = require("express");
const router = express.Router();
const cartFacade = require("./facade");
const { authMiddleware } = require("../../shared/middleware/auth");

router.use(authMiddleware);

router.get("/", cartFacade.all);

router.get("/:id", cartFacade.one);

router.post("/", cartFacade.add);

router.put("/:id", cartFacade.update);

router.delete("/:id", cartFacade.delete);

module.exports = router;
