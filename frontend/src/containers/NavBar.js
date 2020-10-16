import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import DrawerToggleButton from '../common/DrawerToggleButton';
import SideDrawer from '../common/SideDrawer';
import Backdrop from '../common/Backdrop';

// import { logout } from '../store/actions';
import { logout, closeSidedrawer, toggleSidedrawer } from '../store/actions';
import Logo from '../images/shira-logo.png';

class Navbar extends Component {
	logout = (e) => {
		e.preventDefault();
		this.props.logout();
	};

	render() {
		let backdrop;

		if (this.props.sideDrawerOpen) {
			backdrop = <Backdrop click={this.props.closeSidedrawer} />;
		}

		return (
			<nav className="navbar navbar-expand-sm justify-content-between">
				<div className="top_drawer-toggle-container">
					<DrawerToggleButton click={this.props.toggleSidedrawer} />
				</div>

				<SideDrawer
					show={this.props.sideDrawerOpen}
					click={this.props.closeSidedrawer}
					logout={this.props.logout}
					currentUser={this.props.currentUser}
				/>

				{backdrop}
				<a className="navbar-brand" href="/">
					<img src={Logo} alt="Haiyan Home" />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a href="/" className="nav-link">
								Home<span className="sr-only">(current)</span>
							</a>
						</li>

						<li className="nav-item">
							<Link to="/techinfo" className="nav-link">
								My Tech Warehouse
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/suggestion" className="nav-link">
								Your Suggestions
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/todos" className="nav-link">
								My Todos
							</Link>
						</li>
					</ul>

					{this.props.currentUser.isAuthenticated ? (
						// <ul className="nav-navbar-nav">
						<div className="logout">
							<div>
								<strong>Hello, {this.props.currentUser.user.username}</strong>
							</div>
							<div>
								<button onClick={this.logout} className="btn btn-info btn-sm">
									Log out
								</button>
							</div>
						</div>
					) : (
						<ul className="nav navbar-nav">
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
		currentUser: state.currentUser,
		sideDrawerOpen: state.sideDrawer.sideDrawerOpen
	};
}

export default connect(mapStateToProps, { logout, closeSidedrawer, toggleSidedrawer })(Navbar);
