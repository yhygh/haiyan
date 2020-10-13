var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../handlers/gurulinks');
const { loginRequired, ensureAdmin } = require('../middleware/auth');

// router.route('/ts/:techsectionId').get(helpers.getGurulinks).post(helpers.createGurulink);
router.route('/ts/:techsectionId').post(loginRequired, ensureAdmin, helpers.createGurulink);

router.route('/:gurulinkId/ts/:techsectionId').delete(loginRequired, ensureAdmin, helpers.deleteGurulink);

router.route('/:gurulinkId').get(helpers.getGurulink).put(loginRequired, ensureAdmin, helpers.updateGurulink);
module.exports = router;
