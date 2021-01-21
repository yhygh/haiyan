// necessary for production
const path = require('path');

require('dotenv').config();
const express = require('express'),
	app = express(),
	port = process.env.PORT || 4000,
	cors = require('cors'), // make a request to localhost:4000 from localhost:3000
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	errorHandler = require('./handlers/error'),
	todoRoutes = require('./routes/todos'),
	techsectionRoutes = require('./routes/techsections'),
	gurulinkRoutes = require('./routes/gurulinks'),
	authRoutes = require('./routes/auth'),
	messagesRoutes = require('./routes/messages'),
	mongoSanitize = require('express-mongo-sanitize'),
	// helmet = require('helmet');

	{ loginRequired, ensureCorrectUser, ensureAdmin } = require('./middleware/auth'),
	db = require('./models');

app.use(morgan('tiny'));
app.use(bodyParser.json()); // building api
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());

// TODO: fix the options for helmet
// app.use(helmet());

// necessary for production
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/', function(req, res) {
	res.send({ message: 'Hi from root express' });
});

app.use('/api/auth', authRoutes);
app.use('/api/todos', loginRequired, ensureAdmin, todoRoutes);
app.use('/api/ts', techsectionRoutes);
app.use('/api/gl', gurulinkRoutes);
app.use('/api/users/:user_id/messages', loginRequired, ensureCorrectUser, messagesRoutes);

app.get('/api/messages', loginRequired, async function(req, res, next) {
	try {
		let messages = await db.Message.find().sort({ createdAt: 'desc' }).populate('user', {
			username: true
		});
		console.log(`messages found? ${messages}`);
		return res.status(200).json(messages);
	} catch (err) {
		console.log(`err is ${err}`);
		return next(err);
	}
});

app.use(function(req, res, next) {
	// next allows us to move to the next piece of middleware
	// important for error handling so that we can bubble up our error
	let err = new Error('Not Found!');
	err.status = 404;
	console.log(err);
	next(err);
});

app.use(errorHandler);

// app.listen(process.env.PORT, )
app.listen(port, function() {
	console.log('APP is running on port ' + port);
});
