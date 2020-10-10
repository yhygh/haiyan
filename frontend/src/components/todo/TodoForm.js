import React, { Component } from 'react';
// import requireAuth from '../../hocs/requireAuth';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions';

class TodoForm extends Component {
	constructor(props) {
		super(props);
		console.log(`TodoForm constructor props ...`);
		console.log(props);

		this.state = { task: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleAddTodo = this.handleAddTodo.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleAddTodo(e) {
		e.preventDefault(); // make sure the page doesn't refresh
		console.log(`inside TodoForm, handleAddTodo ...`);
		this.props.addTodo(this.state.task);

		this.setState({ task: '' });

		// e.target.reset();
		this.props.history.push('/todos');
		// this.props.history.goBack();
	}

	render() {
		return (
			<form onSubmit={this.handleAddTodo}>
				<input type="text" name="task" value={this.state.task} onChange={this.handleChange} />
				<button>Add a task</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, { addTodo })(TodoForm);
// export default TodoForm;
