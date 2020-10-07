import React, { Component } from 'react';

class TodoForm extends Component {
	constructor(props) {
		super(props);
		console.log(`TodoForm props ...`);
		console.log(props);

		this.state = { task: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault(); // make sure the page doesn't refresh
		this.props.handleSubmit(this.state.task);
		e.target.reset();
		this.props.history.push('/todos');
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="task" value={this.state.task} onChange={this.handleChange} />
				<button>Add a task</button>
			</form>
		);
	}
}

export default TodoForm;
