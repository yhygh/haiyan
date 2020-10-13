require('dotenv').config();

const jwt = require('jsonwebtoken');

// make sure the user is logged in
exports.loginRequired = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			if (decoded) {
				// decoded: { id: '5f7b152da2f786acfc05ba73', username: 'somename', iat: 1602477923 }
				return next();
			} else {
				return next({
					status: 401,
					message: 'Please log in first' // better be generic here
				});
			}
		});
	} catch (err) {
		return next({
			status: 401,
			message: 'Please log in first second'
		});
	}
};

// /api/users/:user_id/messages
// make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			if (decoded && decoded.id === req.params.user_id) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Unauthorized'
				});
			}
		});
	} catch (err) {
		return next({
			status: 401,
			message: 'Unauthorized'
		});
	}
};

// TODO: change authorization to be role based
exports.ensureAdmin = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			if (decoded && decoded.username === process.env.ADMIN) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Unauthorized' // Admin required
				});
			}
		});
	} catch (err) {
		return next({
			status: 401,
			message: 'Unauthorized' // Admin required
		});
	}
};
