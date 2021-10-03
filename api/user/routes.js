const express = require("express");
const router = express.Router();
const userFacade = require("./facade");

router.get("/", userFacade.all);

router.get("/:id", userFacade.one);

router.post("/regist", userFacade.regist);

router.post("/login", userFacade.login);

router.put("/:id", userFacade.update);

router.delete("/:id", userFacade.delete);

module.exports = router;
