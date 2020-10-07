import React, { Component } from 'react';
import Todo from '../components/todo/Todo';
import TodoForm from '../components/todo/TodoForm';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTodo, removeTodo, getTodos } from '../store/actions';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.handleAdd = this.handleAdd.bind(this);
	}

	componentDidMount() {
		// debugger;
		this.props.getTodos();
	}

	handleAdd(val) {
		this.props.addTodo(val);
	}

	removeTodo(id) {
		this.props.removeTodo(id);
	}

	render() {
		// debugger;
		console.log(this.props);
		console.log(`props above todos...`);
		let todos = this.props.todoState.todos.map((todo) => (
			<Todo removeTodo={this.removeTodo.bind(this, todo._id)} task={todo.task} key={todo._id} />
		));
		return (
			<div>
				<p>
					<Link to="/">Home</Link>
				</p>
				<h1>Todo List</h1>
				<Route path="/todos/new" component={(props) => <TodoForm {...props} handleSubmit={this.handleAdd} />} />
				<Link to="/todos/new">Add a task</Link>
				<div>{todos}</div>
				{/* <Route exact path="/todos" component={() => <div>{todos}</div>} /> */}
			</div>
		);
	}
}

function mapStateToProps(reduxState) {
	// debugger;
	return {
		todoState: reduxState.todos
	};
}

export default connect(mapStateToProps, { addTodo, removeTodo, getTodos })(TodoList);
