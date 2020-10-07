import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link, Route } from 'react-router-dom';

import TechSection from '../components/tech/TechSection';

import TechSectionForm from '../components/tech/TechSectionForm';
import { addTechSection, removeTechSection, getTechSections, addGuruLink, removeGuruLink } from '../store/actions';

// import * as apiCalls from '../apiTech';

class TechSections extends Component {
	constructor(props) {
		super(props);
		this.handleAddTechSection = this.handleAddTechSection.bind(this);
	}

	componentDidMount() {
		// debugger;
		this.props.getTechSections();
	}

	handleAddTechSection(val) {
		this.props.addTechSection(val);
	}

	removeTechSection(id) {
		this.props.removeTechSection(id);
	}

	updateTechSection(id) {
		console.log(id);
	}

	handleAddGuruLink(techId, title, url, comment) {
		this.props.addGuruLink(techId, title, url, comment);
	}

	handleRemoveGuruLink(techId, linkId) {
		this.props.removeGuruLink(techId, linkId);
	}

	render() {
		// debugger;
		console.log(this.props);
		console.log(`props above techSections ...`);
		const techSections = this.props.techState.techSections.map((techSection) => (
			<TechSection
				key={techSection._id}
				{...techSection}
				onDelete={this.removeTechSection.bind(this, techSection._id)}
				onUpdate={this.updateTechSection.bind(this, techSection)}
				addGuruLink={this.handleAddGuruLink.bind(this, techSection._id)}
				removeGuruLink={this.handleRemoveGuruLink.bind(this, techSection._id)}
			/>
		));
		return (
			<div>
				<p>
					<Link to="/">Home</Link>
				</p>
				<h1>TechSections</h1>
				<Link to="/techinfo/new">Add a Tech Section</Link>
				<Route
					path="/techinfo/new"
					component={(props) => <TechSectionForm {...props} addTechSection={this.handleAddTechSection} />}
				/>
				{/* <TechSectionForm addTechSection={this.handleAddTechSection} /> */}
				<ul>{techSections}</ul>
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	// debugger;
	return {
		techState: reduxState.tech
	};
}

export default connect(mapStateToProps, {
	addTechSection,
	removeTechSection,
	getTechSections,
	addGuruLink,
	removeGuruLink
})(TechSections);
