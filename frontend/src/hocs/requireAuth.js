import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

export default function requireAuth(ChildComponent) {
	class RequireAuth extends Component {
		componentWillMount() {
			if (this.props.isAuthenticated === false) {
				this.props.history.push('/signin');
			}
		}

		render() {
			return <ChildComponent {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return {
			isAuthenticated: state.currentUser.isAuthenticated
		};
	}

	return connect(mapStateToProps)(RequireAuth);
}
