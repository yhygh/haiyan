import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ currentUser }) => (
	<div>
		<h1>Welcome to Haiyan's Backyard</h1>
		{!currentUser.isAuthenticated ? (
			<div className="home-hero">
				<h1>Best Teachers</h1>
				<h4>My favorite teachers</h4>
				<Link to="/signup" className="btn btn-primary">
					Sign Up Here
				</Link>
			</div>
		) : (
			<div>Something to be filled here</div>
		)}
	</div>
);

export default Home;
