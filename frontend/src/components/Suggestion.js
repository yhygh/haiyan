import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeline from './MessageTimeline';

const Suggestion = ({ currentUser }) => (
	<div>
		{!currentUser.isAuthenticated ? (
			<div className="home-hero">
				<Link to="/signin" className="btn btn-primary">
					Please Log In
				</Link>
			</div>
		) : (
			<div>
				<div className="nav-navbar-nav navbar-right">
					<Link to={`/users/${currentUser.user.id}/messages/new`}>New message</Link>
				</div>
				<MessageTimeline />
			</div>
		)}
	</div>
);

export default Suggestion;
