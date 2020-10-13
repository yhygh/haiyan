var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../handlers/techsections');

const { loginRequired, ensureAdmin } = require('../middleware/auth');

router.route('/').get(helpers.getTechsections).post(loginRequired, ensureAdmin, helpers.createTechsection);
router
	.route('/:techsectionId')
	.get(helpers.getTechsection)
	.put(loginRequired, ensureAdmin, helpers.updateTechsection)
	.delete(loginRequired, ensureAdmin, helpers.deleteTechsection);

module.exports = router;
