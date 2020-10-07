require('dotenv').config();
const express = require('express'),
	app = express(),
	port = process.env.PORT || 4000;

const cors = require('cors'); // make a request to localhost:4000 from localhost:3000
const morgan = require('morgan');
const bodyParser = require('body-parser');

const errorHandler = require('./handlers/error');

const todoRoutes = require('./routes/todos');
const techsectionRoutes = require('./routes/techsections');
const gurulinkRoutes = require('./routes/gurulinks');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');

const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const db = require('./models');

app.use(morgan('tiny'));
app.use(bodyParser.json()); // building api
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.send({ message: 'Hi from root express' });
});

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/ts', techsectionRoutes);
app.use('/api/gl', gurulinkRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messagesRoutes);

app.get('/api/messages', loginRequired, async function(req, res, next) {
	try {
		let messages = await db.Message.find().sort({ createdAt: 'desc' }).populate('user', {
			username: true,
			profileImageUrl: true
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
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

// app.listen(process.env.PORT, )
app.listen(port, function() {
	console.log('APP is running on port ' + port);
});
