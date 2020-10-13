import React, { Component } from 'react';
import Todo from '../components/todo/Todo';
import TodoForm from '../components/todo/TodoForm';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeTodo, fetchTodos } from '../store/actions';
import requireAuth from '../hocs/requireAuth';
import { json } from 'body-parser';

class TodoList extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// debugger;
		this.props.fetchTodos();
	}

	removeTodo(id) {
		this.props.removeTodo(id);
	}

	render() {
		// debugger;
		const currentUser = this.props.currentUser;
		console.log(`is current user admin? currentUser: ${currentUser}`);
		console.log(currentUser);

		let todos = this.props.todoState.todos.map((todo) => (
			<Todo removeTodo={this.removeTodo.bind(this, todo._id)} task={todo.task} key={todo._id} />
		));

		return this.props.errors && this.props.errors.message ? (
			<div>{this.props.errors.message} Only the admin can view or edit this page!</div>
		) : (
			<div>
				<h1>Todo List</h1>
				<Route path="/todos/new" component={requireAuth((props) => <TodoForm {...props} />)} />
				<Link to="/todos/new">Add a task</Link>
				<div>{todos}</div>
				{/* <Route exact path="/todos" component={() => <div>{todos}</div>} /> */}
			</div>
		);
	}
}

function mapStateToProps(state) {
	// debugger;
	return {
		todoState: state.todos,
		errors: state.errors
	};
}

export default connect(mapStateToProps, { removeTodo, fetchTodos })(TodoList);
