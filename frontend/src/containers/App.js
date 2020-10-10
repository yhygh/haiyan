import React, { Component } from 'react';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Home from '../components/Home';
import AuthForm from '../components/AuthForm';
import { authUser, removeError } from '../store/actions';
import requireAuth from '../hocs/requireAuth';

import MessageForm from './MessageForm';
import TodoForm from '../components/todo/TodoForm';

import TechSections from './TechSections';
import TodoList from './TodoList';
import Suggestion from '../components/Suggestion';

class App extends Component {
	render() {
		// console.log(`props before ... ${this.props}`);
		// console.log(`props after destructure`);
		// console.log(this.props);
		const { authUser, errors, removeError, currentUser } = this.props;

		return (
			<div className="App">
				<Router>
					<div className="onboarding">
						<NavBar />
					</div>
					<div className="container">
						<Switch>
							{/* <Route path="/" exact component={Home} /> */}
							<Route path="/" exact render={(props) => <Home currentUser={currentUser} {...props} />} />
							<Route
								path="/suggestion"
								exact
								render={(props) => <Suggestion currentUser={currentUser} {...props} />}
							/>
							<Route
								path="/todos"
								exact
								render={(props) => <TodoList currentUser={currentUser} {...props} />}
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
										heading="Please Log In"
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
							<Route path="/techinfo" component={TechSections} />
							<Route path="/users/:id/messages/new" component={requireAuth(MessageForm)} />
							<Route path="/todos/new" component={requireAuth((props) => <TodoForm {...props} />)} />
							{/* <TechSections /> */}
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
