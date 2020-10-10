// import React, { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import MessageTimeline from './MessageTimeline';

const Suggestion = ({ currentUser }) => (
	<div>
		{!currentUser.isAuthenticated ? (
			<div className="home-hero">
				<h4>New to Haiyan's Tech Friends Circle?</h4>
				<Link to="/signup" className="btn btn-primary">
					Sign Up Here
				</Link>
			</div>
		) : (
			<div>
				<MessageTimeline username={currentUser.user.username} />
			</div>
		)}
	</div>
);

export default Suggestion;
