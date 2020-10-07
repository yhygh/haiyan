import React, { Component } from 'react';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Home from '../components/Home';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import requireAuth from '../hocs/requireAuth';

import MessageForm from './MessageForm';

import TechSections from './TechSections';
import TodoList from './TodoList';
import Suggestion from '../components/Suggestion';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { authUser, errors, removeError, currentUser } = this.props;
		console.log(`props inside App.js ... ${this.props}`);
		return (
			<div className="App">
				<Router>
					<div className="onboarding">
						<NavBar />
					</div>
					<div className="container">
						<Switch>
							{/* <Route path="/" exact component={Home} /> */}
							<Route
								exact
								path="/"
								exact
								render={(props) => <Home currentUser={currentUser} {...props} />}
							/>
							<Route
								exact
								path="/suggestion"
								exact
								render={(props) => <Suggestion currentUser={currentUser} {...props} />}
							/>
							<Route
								exact
								path="/signin"
								render={(props) => (
									<AuthForm
										removeError={removeError}
										errors={errors}
										onAuth={authUser}
										buttonText="Log in"
										heading="Welcome Back."
										{...props}
									/>
								)}
							/>
							<Route
								exact
								path="/signup"
								render={(props) => (
									<AuthForm
										removeError={removeError}
										errors={errors}
										onAuth={authUser}
										signUp
										buttonText="Sign me up!"
										heading="Join Warbler Today."
										{...props}
									/>
								)}
							/>
							<Route path="/todos" component={TodoList} />
							<Route path="/techinfo" component={TechSections} />
							<Route path="/users/:id/messages/new" component={requireAuth(MessageForm)} />
							<TechSections />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default connect(mapStateToProps, { authUser, removeError })(App);
