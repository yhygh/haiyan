var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../helpers/techsections');

router.route('/').get(helpers.getTechsections).post(helpers.createTechsection);
router
	.route('/:techsectionId')
	.get(helpers.getTechsection)
	.put(helpers.updateTechsection)
	.delete(helpers.deleteTechsection);

module.exports = router;
