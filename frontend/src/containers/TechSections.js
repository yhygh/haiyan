import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link, Route } from 'react-router-dom';

import TechSection from '../components/tech/TechSection';

import TechSectionForm from '../components/tech/TechSectionForm';
import { removeTechSection, fetchTechSections } from '../store/actions';
import requireAuth from '../hocs/requireAuth';

class TechSections extends Component {
	componentDidMount() {
		// debugger;
		this.props.fetchTechSections();
	}

	removeTechSection(id) {
		this.props.removeTechSection(id);
	}

	render() {
		// debugger;
		const currentUser = this.props.currentUser;
		const techSections = this.props.techState.techSections.map((techSection) => (
			<TechSection
				key={techSection._id}
				{...techSection}
				currentUser={currentUser}
				onDelete={this.removeTechSection.bind(this, techSection._id)}
			/>
		));
		return (
			<div>
				<h2>Tech Sections</h2>
				<Route path="/techinfo/new" component={requireAuth((props) => <TechSectionForm {...props} />)} />
				{currentUser.isAuthenticated && currentUser.user.isAdmin ? (
					<Link to="/techinfo/new">Add a Tech Section</Link>
				) : null}
				{/* <Route path="/techinfo" component={() => <div>{techSections}</div>} /> */}
				<div className="main-grid">{techSections}</div>
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
