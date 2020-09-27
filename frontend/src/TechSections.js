import React, { Component } from 'react';

import TechSection from './TechSection';

import TechSectionForm from './TechSectionForm';

import * as apiCalls from './apiTech';

class TechSections extends Component {
	constructor(props) {
		super(props);
		this.state = {
			techSections: []
		};
		this.addTechSection = this.addTechSection.bind(this);
	}

	componentDidMount() {
		this.loadTechSections();
	}

	async loadTechSections() {
		let techSections = await apiCalls.getTechSections();
		this.setState({ techSections });
	}

	async addTechSection(val) {
		let newTechSection = await apiCalls.createTechSection(val);
		this.setState({ techSections: [ ...this.state.techSections, newTechSection ] });
	}

	async deleteTechSection(id) {
		await apiCalls.removeTechSection(id);
		console.log(`id of tech section to be deleted: ${id}`);
		const techSections = this.state.techSections.filter((techSection) => techSection._id !== id);
		this.setState({ techSections: techSections });
	}

	async updateTechSection(techSection) {
		console.log('to be completed ...');
		// const updatedTodo = await apiCalls.updateTodo(todo);
		// const todos = this.state.todos.map((t) => (t._id === updatedTodo._id ? { ...t, completed: !t.completed } : t));
		// this.setState({ todos: todos });
	}

	render() {
		const techSections = this.state.techSections.map((techSection) => (
			<TechSection
				key={techSection._id}
				{...techSection}
				onDelete={this.deleteTechSection.bind(this, techSection._id)}
				onUpdate={this.updateTechSection.bind(this, techSection)}
			/>
		));
		return (
			<div>
				<h1>TechSections</h1>
				<TechSectionForm addTechSection={this.addTechSection} />
				<ul>{techSections}</ul>
			</div>
		);
	}
}

export default TechSections;
