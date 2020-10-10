var mongoose = require('mongoose');

var techsectionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	links: [
		{
			type: mongoose.ObjectId,
			ref: 'Gurulink'
		}
	]
});

module.exports = mongoose.model('Techsection', techsectionSchema);
