import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function requireAuth(ChildComponent) {
	class RequireAuth extends Component {
		render() {
			console.log(`inside RequireAuth ...`);

			switch (this.props.isAuthenticated) {
				case false:
					return <Redirect to="/signin" />;
				default:
					console.log(`inside RequireAuth child component ... props`);
					console.log(this.props);
					return <ChildComponent {...this.props} />;
			}
		}
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.currentUser.isAuthenticated
		};
	}

	return connect(mapStateToProps)(RequireAuth);
}
