import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import Logo from '../images/warbler-logo.png';

class Navbar extends Component {
	logout = (e) => {
		e.preventDefault();
		this.props.logout();
	};

	render() {
		return (
			<nav className="navbar navbar-expand">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link to="/" className="navbar-brand">
							<img src={Logo} alt="Warbler Home" />
						</Link>

						<div class="collapse navbar-collapse" id="navbarNav">
							<ul class="navbar-nav">
								<li class="nav-item nav-link active">
									<Link to="/todos">See my todos!</Link>
								</li>
								<li class="nav-item nav-link">
									<Link to="/techinfo">My Tech Warehouse</Link>
								</li>
								<li class="nav-item nav-link">
									<Link to="/suggestion">Other Suggestions</Link>
								</li>
							</ul>
						</div>
					</div>

					{this.props.currentUser.isAuthenticated ? (
						<ul className="nav-navbar-nav navbar-right">
							<li>
								<Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>New message</Link>
							</li>
							<li>
								<a onClick={this.logout}>Log out</a>
							</li>
						</ul>
					) : (
						<ul className="nav navbar-nav navbar-right">
							<li>
								<Link to="/signup">Sign up</Link>
							</li>
							<li>
								<Link to="/signin">Log in</Link>
							</li>
						</ul>
					)}
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, { logout })(Navbar);
