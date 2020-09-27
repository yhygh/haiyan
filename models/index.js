var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
module.exports.Techsection = require('./techsection');
module.exports.Gurulink = require('./gurulink');
