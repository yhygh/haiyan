var db = require('../models');

// /api/gl/ts/:techsectionId
// test using httpie
//     http POST localhost:4000/api/gl/ts/5f7f6e80c64f48fcd4699a51 "Authorization:Bearer token" title="sometitle" url="http://www.python.test"
exports.createGurulink = async function(req, res, next) {
	try {
		let newLink = await db.Gurulink.create(req.body);
		let foundTechsection = await db.Techsection.findById(req.params.techsectionId);
		foundTechsection.links.push(newLink);
		foundTechsection.save();
		return res.status(201).json(newLink);
	} catch (err) {
		return next(err);
	}
};

// /api/gl/:gurulinkId
// test using httpie
//    http GET localhost:4000/api/gl/5f7643326b330071aa57c92a  "Authorization:Bearer token"
exports.getGurulink = async function(req, res, next) {
	try {
		let foundGurulink = await db.Gurulink.findById(req.params.gurulinkId);
		return res.status(200).json(foundGurulink);
	} catch (err) {
		return next(err);
	}
};

// /api/gl/:gurulinkId
// test using httpie
//      http PUT localhost:4000/api/gl/5f7f874cdb3399ffcc78e56d
//      "Authorization:Bearer token" title="updated title" url="newurl"
exports.updateGurulink = async function(req, res, next) {
	try {
		let gurulink = await db.Gurulink.findByIdAndUpdate({ _id: req.params.gurulinkId }, req.body, { new: true });
		return res.status(200).json(gurulink);
	} catch (err) {
		return next(err);
	}
};

// /api/gl/:gurulinkId/ts/:techsectionId
// test using httpie
//    http DELETE localhost:4000/api/gl/5f7f863955633eff920f0c72/ts/5f7f6e80c64f48fcd4699a51
//       "Authorization:Bearer token"
exports.deleteGurulink = async function(req, res, next) {
	try {
		let foundTechsection = await db.Techsection.findById(req.params.techsectionId);
		let foundGurulink = await db.Gurulink.findByIdAndRemove({ _id: req.params.gurulinkId });
		const pos = foundTechsection.links.indexOf(req.params.gurulinkId);
		foundTechsection.links.splice(pos, 1);
		foundTechsection.save();
		res.status(200).json(foundGurulink);
	} catch (err) {
		return next(err);
	}
};

module.exports = exports;
