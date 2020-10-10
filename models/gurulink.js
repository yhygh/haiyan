var mongoose = require('mongoose');

var gurulinkSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	comment: String
});

module.exports = mongoose.model('Gurulink', gurulinkSchema);
