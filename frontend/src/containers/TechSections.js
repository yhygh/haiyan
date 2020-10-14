import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link, Route } from 'react-router-dom';

import TechSection from '../components/tech/TechSection';

import TechSectionForm from '../components/tech/TechSectionForm';
import { removeTechSection, fetchTechSections } from '../store/actions';
import requireAuth from '../hocs/requireAuth';

class TechSections extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// debugger;
		this.props.fetchTechSections();
	}

	removeTechSection(id) {
		this.props.removeTechSection(id);
	}

	updateTechSection(id) {
		console.log(id);
	}

	render() {
		// debugger;
		console.log(this.props);
		console.log(`props above techSections ...`);
		const currentUser = this.props.currentUser;
		const techSections = this.props.techState.techSections.map((techSection) => (
			<TechSection
				key={techSection._id}
				{...techSection}
				currentUser={currentUser}
				onDelete={this.removeTechSection.bind(this, techSection._id)}
				onUpdate={this.updateTechSection.bind(this, techSection)}
			/>
		));
		return (
			<div>
				<p>
					<Link to="/">Home</Link>
				</p>
				<h1>TechSections</h1>
				<Route path="/techinfo/new" component={requireAuth((props) => <TechSectionForm {...props} />)} />
				{currentUser.isAuthenticated && currentUser.user.isAdmin ? (
					<Link to="/techinfo/new">Add a Tech Section</Link>
				) : null}
				{/* <Route path="/techinfo" component={() => <div>{techSections}</div>} /> */}
				<ul>{techSections}</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// debugger;
	return {
		techState: state.tech,
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, {
	removeTechSection,
	fetchTechSections
})(TechSections);
