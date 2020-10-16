import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import Footer from '../components/Footer';
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
			<Fragment>
				<Router>
					<div className="header">
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
									if (!currentUser.isAuthenticated || !currentUser.user.isAdmin) {
										return (
											<div className="haiyan-bg">
												<Link to="/signin" className="btn btn-lg">
													Priviledged User Log In
												</Link>
											</div>
										);
									} else {
										return <TodoList {...props} />;
									}
								}}
							/>

							<Route path="/techinfo" render={(props) => <TechSections {...props} />} />
							<Route
								exact
								path="/signin"
								render={(props) => (
									<AuthForm
										removeError={removeError}
										errors={errors}
										onAuth={authUser}
										buttonText="Log in"
										heading=""
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
										heading="Join Haiyan Friends Circle Today"
										{...props}
									/>
								)}
							/>
							<Route path="/users/:id/messages/new" component={requireAuth(MessageForm)} />
						</Switch>
					</div>
				</Router>
				<div className="footer-container">
					<Footer />
				</div>
			</Fragment>
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
