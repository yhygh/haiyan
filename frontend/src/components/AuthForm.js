import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: '',
			// user input validation errors
			inputerrors: {
				email: '',
				username: '',
				password: ''
			} 
		};
	}

	// handleChange = (e) => {
	// 	this.setState({
	// 		[e.target.name]: e.target.value
	// 	});
	// };

	// TODO: move validation test to a separate file
	handleChange = (e) => {
		e.preventDefault();
		const {name, value} = e.target;

		let errors = this.state.inputerrors;
		switch (name) {
			case 'email':
				errors.email = isEmail(value) ? '' : 'Email is not valid!';
				break;
			case 'username':
				errors.username = (/\W/.test(value)) ? "Username contains illegal characters!" :
				( value.length < 4 || value.length > 10 ) 
					? 'Username must be 4 to 10 characters long!'
					: '';
				break;				
			case 'password':
				errors.password = 
        ( value.length < 4 || value.length > 10 ) 
          ? 'Password must be 4 to 10 characters long!'
          : '';
				break;
			default: 
				break;
		}

		this.setState({errors, [e.target.name]: e.target.value});

	};

	handleSubmit = (e) => {
		e.preventDefault();
		const authType = this.props.signUp ? 'signup' : 'signin';
		this.props
			.onAuth(authType, this.state)
			.then(() => {
				this.props.history.push('/');
				// this.props.history.goBack();
			})
			.catch(() => {
				return;
			});
	};

  // componentDidMount(){
	// 	// username is for the user to be logged in
	// 	// existingUser: if an user already logged in (for the todos page, privileged user login)
	// 	// log out the existing user first
	// 	// debugger
	// 	if ( this.props.currentUser && this.props.currentUser.isAuthenticated ) {
	// 		this.props.logout();
	// 	}
	// }

	componentDidMount() {
				// If there's a change in the router, we'll call removeError() and reset user input error
		this.unregisterHistoryListener	=	this.props.history.listen(() => {
					this.props.removeError();
					this.setState({inputerrors: {email: '', username: '', password: ''}});
				});
	}

	componentWillUnmount() {
		this.unregisterHistoryListener();
	}

	render() {
		// const { heading, buttonText, signUp, errors, history, removeError } = this.props;
		const { heading, buttonText, signUp, errors } = this.props;
		const { email, username, inputerrors } = this.state;

		return (
			<div>
				<div className="row justify-content-md-center text-center">
					<div className="col-md-8">
						<form onSubmit={this.handleSubmit}>
							<h2>{heading}</h2>
							{errors.message && <div className="alert alert-danger">{errors.message}</div>}
							<label htmlFor="email">Email:</label>
							<input
								className="form-control"
								id="email"
								name="email"
								onChange={this.handleChange}
								value={email}
								type="email"
							/>
							{inputerrors.email.length > 0 && <div className="alert alert-danger">{inputerrors.email}</div>}

							<label htmlFor="password">Password:</label>
							<input
								className="form-control"
								id="password"
								name="password"
								onChange={this.handleChange}
								type="password"
							/>
							{inputerrors.password.length > 0 && <div className="alert alert-danger">{inputerrors.password}</div>}

							{signUp && (
								<div>
									<label htmlFor="username">Username:</label>
									<input
										className="form-control"
										id="username"
										name="username"
										onChange={this.handleChange}
										value={username}
										type="text"
									/>
								</div>
							)}
							{inputerrors.username.length > 0 && <div className="alert alert-danger">{inputerrors.username}</div>}
							<button type="submit" className="btn btn-primary btn-block btn-lg">
								{buttonText}
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AuthForm;
