import React, { Component } from 'react';

class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const authType = this.props.signUp ? 'signup' : 'signin';
		this.props
			.onAuth(authType, this.state)
			.then(() => {
				// this.props.history.push('/');
				this.props.history.goBack();
			})
			.catch(() => {
				return;
			});
	};

	render() {
		const { email, username } = this.state;
		const { heading, buttonText, signUp, errors, history, removeError } = this.props;

		// If there's a change in the router, we'll call removeError()
		history.listen(() => {
			removeError();
		});

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
								type="text"
							/>
							<label htmlFor="password">Password:</label>
							<input
								className="form-control"
								id="password"
								name="password"
								onChange={this.handleChange}
								type="password"
							/>
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
