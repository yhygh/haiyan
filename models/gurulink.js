var mongoose = require('mongoose');

var gurulinkSchema = new mongoose.Schema({
	title: {
		type: String,
		required: 'title cannot be blank'
	},
	url: {
		type: String,
		required: true
	},
	comment: String
});

module.exports = mongoose.model('Gurulink', gurulinkSchema);
