var db = require('../models');

exports.getTechsections = function(req, res) {
	db.Techsection
		.find()
		.then(async function(techSections) {
			for (let ts of techSections) {
				await ts.populate('links').execPopulate();
			}
			res.json(techSections);
		})
		.catch(function(err) {
			res.send(err);
		});
};

exports.createTechsection = function(req, res) {
	console.log(req.body);
	db.Techsection
		.create(req.body)
		.then(function(newTechsection) {
			res.status(201).json(newTechsection);
		})
		.catch(function(err) {
			res.send(err);
		});
};

exports.getTechsection = function(req, res) {
	db.Techsection
		.findById(req.params.techsectionId)
		.populate('links')
		.exec() // this line can be removed
		.then(function(foundTechsection) {
			res.json(foundTechsection);
		})
		.catch(function(err) {
			res.send(err);
		});
};

exports.updateTechsection = function(req, res) {
	db.Techsection
		.findOneAndUpdate({ _id: req.params.techsectionId }, req.body, { new: true })
		.then(function(techsection) {
			res.json(techsection);
		})
		.catch(function(err) {
			res.send(err);
		});
};

exports.deleteTechsection = function(req, res) {
	db.Techsection
		.deleteOne({ _id: req.params.techsectionId })
		.then(function() {
			res.json({ message: 'We deleted the tech section!' });
		})
		.catch(function(err) {
			res.send(err);
		});
};

module.exports = exports;
