import React from 'react';
import { Link } from 'react-router-dom';
import HaiyanHead from '../images/HaiyanYang.jpg';

const Home = () => {
	const skills = [
		'Node',
		'Express',
		'MongoDB',
		'React',
		'React-redux',
		'Responsive Design',
		'JavaScript',
		'HTML',
		'CSS',
		'JSON'
	];

	return (
		<div>
			<h2>Welcome to Haiyan's Techland</h2>
			<div className="home-head">
				<img src={HaiyanHead} alt="Haiyan Head Shot" />
			</div>
			<div className="intro">
				<p>
					This is a <strong>full stack website</strong> that is designed for my personal usage. Therefore,
					some pages are not visible to others. However, I'm sharing with you some of the fabulous
					<Link to="/techinfo"> web development resources</Link> including Youtube videos, Udemy courses,
					Bloggers, and Articles I've found in 2020. Swimming in the google ocean isn't really fun, because it
					takes a lot of time to sort out what's worth reading and learning and who is best at explaning
					technologies. Hopefully, the resources I have found are useful for you! I also welcome you to share
					the best web development resources you have found out under the
					<Link to="/suggestion"> Your Suggestions</Link> area.
				</p>
				<div>The skills that I used to build this website are as follows:</div>
				<ul>{skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
			</div>
		</div>
	);
};

export default Home;
