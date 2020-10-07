const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
	try {
		// finding a user
		let user = await db.User.findOne({
			email: req.body.email
		});
		let { id, username, profileImageUrl } = user;
		let isMatch = await user.comparePassword(req.body.password);
		if (isMatch) {
			let token = jwt.sign(
				{
					id,
					username,
					profileImageUrl
				},
				process.env.SECRET_KEY
			);
			return res.status(200).json({
				id,
				username,
				profileImageUrl,
				token
			});
		} else {
			return next({
				status: 400,
				message: 'Invalid Email/Password.'
			});
		}
		// checking if the password matches what was sent to the server
		// if it all matches, log him in
	} catch (e) {
		return next({
			status: 400,
			message: 'Invalid Email/Password.'
		});
	}
};

exports.signup = async function(req, res, next) {
	try {
		// create a user
		// create a token (signing a token)
		// process.env.SECRET_KEY
		let user = await db.User.create(req.body);
		let { id, username, profileImageUrl } = user;
		let token = jwt.sign(
			{
				id,
				username,
				profileImageUrl
			},
			process.env.SECRET_KEY
		);
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			token
		});
	} catch (err) {
		// see what kind of error
		// if it is a certain error
		// respond with user/name already taken
		// otherwise just send back a generic 400

		// if a validation fails
		if (err.code === 11000) {
			err.message = 'Sorry, that username and/or email is taken';
		}
		return next({
			status: 400,
			message: err.message
		});
	}
};
