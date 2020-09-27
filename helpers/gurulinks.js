var db = require('../models');

// exports.createGurulink = function(req, res) {
// 	db.Techsection.findById(req.params.techsectionId).then(function(foundTechsection) {
// 		db.Gurulink
// 			.create(req.body)
// 			.then(function(newLink) {
// 				foundTechsection.links.push(newLink);
// 				foundTechsection.save();
// 				res.status(201).json(newLink);
// 			})
// 			.catch(function(err) {
// 				res.send(err);
// 			});
// 	});
// };

//My experiment to chain it. It works. But maybe there are better ways.
exports.createGurulink = function(req, res) {
	const obj = {};
	db.Techsection
		.findById(req.params.techsectionId)
		.then(function(foundTechsection) {
			obj.foundTechsection = foundTechsection;
			return db.Gurulink.create(req.body);
		})
		.then(function(newLink) {
			obj.foundTechsection.links.push(newLink);
			obj.foundTechsection.save();
			res.status(201).json(newLink);
		})
		.catch(function(err) {
			res.send(err);
		});
};

exports.getGurulink = function(req, res) {
	db.Gurulink
		.findById(req.params.gurulinkId)
		.then(function(foundGurulink) {
			res.json(foundGurulink);
		})
		.catch(function(err) {
			res.send(err);
		});
};

exports.updateGurulink = function(req, res) {
	db.Gurulink
		.findOneAndUpdate({ _id: req.params.gurulinkId }, req.body, { new: true })
		.then(function(gurulink) {
			res.json(gurulink);
		})
		.catch(function(err) {
			res.send(err);
		});
};

exports.deleteGurulink = function(req, res) {
	db.Techsection.findById(req.params.techsectionId).then(function(foundTechsection) {
		db.Gurulink
			.deleteOne({ _id: req.params.gurulinkId })
			.then(function() {
				const pos = foundTechsection.links.indexOf(req.params.gurulinkId);
				foundTechsection.links.splice(pos, 1);
				foundTechsection.save();
				res.json({ message: 'We deleted the gurulink!' });
			})
			.catch(function(err) {
				res.send(err);
			});
	});
};

module.exports = exports;
