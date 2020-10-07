import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function requireAuth(ChildComponent) {
	class RequireAuth extends Component {
		render() {
			switch (this.props.isAuthenticated) {
				case false:
					return <Redirect to="/signin" />;
				default:
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

// export default function withAuth(ComponentToBeRendered) {
// 	class Authenticate extends Component {
// 		componentWillMount() {
// 			if (this.props.isAuthenticated === false) {
// 				this.props.history.push('/signin');
// 			}
// 		}

// 		componentWillUpdate(nextProps) {
// 			if (nextProps.isAuthenticated === false) {
// 				this.props.history.push('/signin');
// 			}
// 		}

// 		render() {
// 			return <ComponentToBeRendered {...this.props} />;
// 		}
// 	}

// 	function mapStateToProps(state) {
// 		return {
// 			isAuthenticated: state.currentUser.isAuthenticated
// 		};
// 	}

// 	return connect(mapStateToProps)(Authenticate);
// }
