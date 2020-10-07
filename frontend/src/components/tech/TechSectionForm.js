import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TechSectionForm extends Component {
	constructor(props) {
		super(props);
		this.state = { inputValue: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			inputValue: e.target.value
		});
	}

	handleSubmit(e) {
		this.props.addTechSection(this.state.inputValue);
		console.log(this.state.inputValue);
		this.props.history.push('/techinfo');
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.inputValue} onChange={this.handleChange} />
				<button onClick={this.handleSubmit}>Create New Tech Section</button>
				<div>
					<Link to="/techinfo">Cancel</Link>
				</div>
			</div>
		);
	}
}

export default TechSectionForm;
