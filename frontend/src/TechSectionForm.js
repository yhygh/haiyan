import React, { Component } from 'react';

class TechSectionForm extends Component {
	constructor(props) {
		super(props);
		this.state = { inputValue: 'Technology Title' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			inputValue: e.target.value
		});
	}

	handleSubmit() {
		this.props.addTechSection(this.state.inputValue);
		console.log(this.state.inputValue);
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.inputValue} onChange={this.handleChange} />
				<button onClick={this.handleSubmit}>Create New Tech Section</button>
			</div>
		);
	}
}

export default TechSectionForm;
