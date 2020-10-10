var db = require('../models');

// /api/ts
// To test using httpie
//     http GET localhost:4000/api/ts "Authorization:Bearer token"
exports.getTechsections = async function(req, res, next) {
	try {
		let techSections = await db.Techsection.find();

		for (let ts of techSections) {
			await ts.populate('links').execPopulate();
		}
		return res.status(200).json(techSections);
	} catch (err) {
		return next(err);
	}
};

// /api/ts
// To test using httpie
//    http POST localhost:4000/api/ts "Authorization:Bearer token" name="something"
exports.createTechsection = async function(req, res, next) {
	console.log(req.body);
	try {
		let newTechsection = await db.Techsection.create(req.body);
		return res.status(201).json(newTechsection);
	} catch (err) {
		return next(err);
	}
};

// /api/ts/:techsectionId
// To test using httpie
exports.getTechsection = async function(req, res, next) {
	try {
		let foundTechsection = await db.Techsection.findById(req.params.techsectionId).populate('links');
		return res.status(200).json(foundTechsection);
	} catch (err) {
		return next(err);
	}
};

// /api/ts/:techsectionId
// To test using httpie
//    http PUT localhost:4000/api/ts/5f7f6e80c64f48fcd4699a51 "Authorization:Bearer token" name="something" links:='["5f7643326b330071aa57c92a"]
//    Notice the syntax using := instead of =
exports.updateTechsection = async function(req, res, next) {
	try {
		let techSection = await db.Techsection.findByIdAndUpdate({ _id: req.params.techsectionId }, req.body, {
			new: true
		});
		return res.status(200).json(techSection);
	} catch (err) {
		return next(err);
	}
};

// /api/ts/:techsectionId
// To test using httpie
//    http DELETE localhost:4000/api/ts/5f7f5fc236916ffc0160f2b1 "Authorization:Bearer token"
exports.deleteTechsection = async function(req, res, next) {
	try {
		let foundTechsection = await db.Techsection.findByIdAndRemove({ _id: req.params.techsectionId });
		return res.status(200).json(foundTechsection);
	} catch (err) {
		return next(err);
	}
};

module.exports = exports;
