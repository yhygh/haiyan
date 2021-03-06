import React, { Component } from 'react';
import Todo from '../components/todo/Todo';
import TodoForm from '../components/todo/TodoForm';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeTodo, fetchTodos } from '../store/actions';

class TodoList extends Component {
	componentDidMount() {
		// debugger;
		this.props.fetchTodos();
	}

	removeTodo(id) {
		this.props.removeTodo(id);
	}

	render() {
		// debugger;
		let todos = this.props.todoState.todos.map((todo) => (
			<Todo removeTodo={this.removeTodo.bind(this, todo._id)} task={todo.task} key={todo._id} />
		));

		return (
			<div>
				<h1>Todo List</h1>
				<Route path="/todos/new" component={(props) => <TodoForm {...props} />} />
				{/* <Route path="/todos/new" component={requireAuth((props) => <TodoForm {...props} />)} /> */}
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
		todoState: state.todos
	};
}

export default connect(mapStateToProps, { removeTodo, fetchTodos })(TodoList);
