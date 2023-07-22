var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/haiyandb-api');

mongoose.Promise = Promise; //using ES2017

module.exports.Todo = require('./todo');
module.exports.Techsection = require('./techsection');
module.exports.Gurulink = require('./gurulink');
module.exports.User = require('./user');
module.exports.Message = require('./message');
