import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import Home from '../components/Home';
import AuthForm from '../components/AuthForm';
import { authUser, removeError } from '../store/actions';
import requireAuth from '../hocs/requireAuth';

import MessageForm from './MessageForm';
import TechSections from './TechSections';
import TodoList from './TodoList';
import Suggestion from '../components/Suggestion';

class App extends Component {
	render() {
		const { authUser, errors, removeError, currentUser } = this.props;
		return (
			<div className="App">
				<Router>
					<div className="onboarding">
						<NavBar />
					</div>
					<div className="container">
						<Switch>
							<Route path="/" exact render={(props) => <Home currentUser={currentUser} {...props} />} />
							<Route
								path="/suggestion"
								exact
								render={(props) => <Suggestion currentUser={currentUser} {...props} />}
							/>

							<Route
								path="/todos"
								render={(props) => {
									console.log(`inside Route, currentUser ...`);
									console.log(currentUser);
									if (!currentUser.isAuthenticated || !currentUser.user.isAdmin) {
										return <div>Please Log in as the Administrator</div>;
									} else {
										return <TodoList {...props} />;
									}
								}}
							/>

							<Route
								path="/techinfo"
								render={(props) => <TechSections {...props} />}
								// component={TechSections}
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
										heading="You are not authorized to view or edit this page!"
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
										heading="Join Haiyan Friends Circle Today."
										{...props}
									/>
								)}
							/>
							<Route path="/users/:id/messages/new" component={requireAuth(MessageForm)} />
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
