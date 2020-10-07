var express = require('express');
var router = express.Router();
var db = require('../models');
var helpers = require('../handlers/gurulinks');

// router.route('/ts/:techsectionId').get(helpers.getGurulinks).post(helpers.createGurulink);
router.route('/ts/:techsectionId').post(helpers.createGurulink);

router.route('/:gurulinkId/ts/:techsectionId').delete(helpers.deleteGurulink);

router.route('/:gurulinkId').get(helpers.getGurulink).put(helpers.updateGurulink);
module.exports = router;
