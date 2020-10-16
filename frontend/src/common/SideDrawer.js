import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const sideDrawer = (props) => {
	let drawerClasses = 'side-drawer';

	if (props.show) {
		drawerClasses = 'side-drawer open';
	}

	return (
		<div className={drawerClasses}>
			<ul>
				<li>
					<Link to="/" onClick={props.click}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/techinfo" onClick={props.click}>
						My Tech Warehouse
					</Link>
				</li>
				<li>
					<Link to="/suggestion" onClick={props.click}>
						Your Suggestions
					</Link>
				</li>
				<li>
					<Link to="/todos" onClick={props.click}>
						My Todos
					</Link>
				</li>
				{props.currentUser.isAuthenticated ? (
					<Fragment>
						<li>Logged in as {props.currentUser.user.username}</li>
						<li>
							<button onClick={props.logout}>Log out</button>
						</li>
					</Fragment>
				) : (
					<Fragment>
						<li>
							<Link to="/signin" className="btn btn-info btn-sm">
								Log in
							</Link>
						</li>
						<li>
							<Link to="/signup" className="btn btn-info btn-sm">
								Sign up
							</Link>
						</li>
					</Fragment>
				)}
			</ul>
		</div>
	);
};

export default sideDrawer;

// {
//   props.navitems.map((interest, index) => (
//     <li key={index}>
//     <Link to={"/"+ props.topicon.pname + interest.link} onClick={props.click}>{interest.name}</Link>
//     </li>
//   ))
// }
