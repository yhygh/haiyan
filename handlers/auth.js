const validator = require('validator/lib/isEmail');
const sanitizeHtml = require('sanitize-html');

const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
	try {
		// finding a user
		let user = await db.User.findOne({
			email: req.body.email
		});
		let { id, username } = user;

		let isMatch = await user.comparePassword(req.body.password);
		if (isMatch) {
			const isAdmin = username === process.env.ADMIN;

			let token = jwt.sign(
				{
					id,
					username,
					isAdmin
				},
				process.env.SECRET_KEY
			);

			// only return isAdmin for signin, not for signup
			return res.status(200).json({
				id,
				username,
				token,
				isAdmin: isAdmin
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

// TODO: move this to a common file
// sanitize attacks such as <script>
sanitizeInput = function(userInput) {
	const sanitizedInput = sanitizeHtml(userInput, {
		allowedTags: [],
		allowedAttributes: {}
	});
	if (sanitizedInput !== userInput) {
		throw new Error('HTML tags not allowed!')
	} 
}


exports.signup = async function(req, res, next) {
	try {
		sanitizeInput(req.body.email);
		if (!validator(req.body.email)) {
			throw new Error('Invalid Email Address');
		}

		sanitizeInput(req.body.username);
		if (req.body.username.length > 10) {
			throw new Error('username must be less than 10 characters');
		} else if (req.body.username.length < 4) {
			throw new Error('username must be longer than 4 characters');
		}

		let pass = req.body.password;
		sanitizeInput(pass);
		if (pass.length < 4 || pass.length > 10) {
			throw new Error('password must between 4 to 10 characters');
		}

		// create a user
		let user = await db.User.create(req.body);
		let { id, username } = user;
		// create a token (signing a token)
		// process.env.SECRET_KEY
		let token = jwt.sign(
			{
				id,
				username
			},
			process.env.SECRET_KEY
		);
		return res.status(200).json({
			id,
			username,
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
