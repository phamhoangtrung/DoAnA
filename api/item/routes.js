const express = require('express');
const router = express.Router();
const itemFacade = require('./facade');

router.get('/', itemFacade.all);

router.get('/:id', itemFacade.one);

router.post('/', itemFacade.add);

router.put('/:id', itemFacade.update);

router.delete('/:id', itemFacade.delete);

module.exports = router;
