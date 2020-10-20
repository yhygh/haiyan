import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeline from './MessageTimeline';

const Suggestion = ({ currentUser }) => (
	<div>
		{!currentUser.isAuthenticated ? (
			<div className="haiyan-bg">
				<Link to="/signup" className="btn btn-lg">
					Sign Up
				</Link>
			</div>
		) : (
			<div className="message-box">
				<div className="message-create">
					<Link to={`/users/${currentUser.user.id}/messages/new`}>Leave New Message</Link>
				</div>
				<MessageTimeline />
			</div>
		)}
	</div>
);

export default Suggestion;
