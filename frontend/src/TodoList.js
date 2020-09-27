import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

import * as apiCalls from './api';

// const APIURL = '/api/todos/';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
		this.addTodo = this.addTodo.bind(this);
	}

	componentDidMount() {
		this.loadTodos();
	}

	async loadTodos() {
		let todos = await apiCalls.getTodos();
		this.setState({ todos });
	}

	async addTodo(val) {
		let newTodo = await apiCalls.createTodo(val);
		this.setState({ todos: [ ...this.state.todos, newTodo ] });
	}

	async deleteTodo(id) {
		await apiCalls.removeTodo(id);
		const todos = this.state.todos.filter((todo) => todo._id !== id);
		this.setState({ todos: todos });
	}

	async toggleTodo(todo) {
		const updatedTodo = await apiCalls.updateTodo(todo);
		const todos = this.state.todos.map((t) => (t._id === updatedTodo._id ? { ...t, completed: !t.completed } : t));
		this.setState({ todos: todos });
	}

	// loadTodos() {
	// 	fetch(APIURL)
	// 		.then((resp) => {
	// 			if (!resp.ok) {
	// 				if (resp.status >= 400 && resp.status < 500) {
	// 					// page not found or something on the server side
	// 					return resp.json().then((data) => {
	// 						let err = { errorMessage: data.message };
	// 						throw err;
	// 					});
	// 				} else {
	// 					let err = { errorMessage: 'Please try again later, server is not responding ' };
	// 					throw err;
	// 				}
	// 			}
	// 			return resp.json();
	// 		})
	// 		.then((todos) => {
	// 			this.setState({ todos });
	// 			console.log(todos);
	// 		});
	// }

	// addTodo(val) {
	// 	fetch(APIURL, {
	// 		method: 'post',
	// 		headers: new Headers({
	// 			'Content-Type': 'application/json'
	// 		}),
	// 		body: JSON.stringify({ name: val })
	// 	})
	// 		.then((resp) => {
	// 			if (!resp.ok) {
	// 				if (resp.status >= 400 && resp.status < 500) {
	// 					// page not found or something on the server side
	// 					return resp.json().then((data) => {
	// 						let err = { errorMessage: data.message };
	// 						throw err;
	// 					});
	// 				} else {
	// 					let err = { errorMessage: 'Please try again later, server is not responding ' };
	// 					throw err;
	// 				}
	// 			}
	// 			return resp.json();
	// 		})
	// 		.then((newTodo) => {
	// 			this.setState({ todos: [ ...this.state.todos, newTodo ] });
	// 		});
	// }

	// deleteTodo(id) {
	// 	const deleteURL = APIURL + 'id';
	// 	fetch(deleteURL, {
	// 		method: 'delete'
	// 	})
	// 		.then((resp) => {
	// 			if (!resp.ok) {
	// 				if (resp.status >= 400 && resp.status < 500) {
	// 					// page not found or something on the server side
	// 					return resp.json().then((data) => {
	// 						let err = { errorMessage: data.message };
	// 						throw err;
	// 					});
	// 				} else {
	// 					let err = { errorMessage: 'Please try again later, server is not responding ' };
	// 					throw err;
	// 				}
	// 			}
	// 			return resp.json();
	// 		})
	// 		.then(() => {
	// 			const todos = this.state.todos.filter((todo) => todo._id !== id);
	// 			this.setState({ todos: todos });
	// 		});
	// }

	// toggleTodo(todo) {
	// 	const updateURL = APIURL + todo._id;
	// 	fetch(updateURL, {
	// 		method: 'put',
	// 		headers: new Headers({
	// 			'Content-Type': 'application/json'
	// 		}),
	// 		body: JSON.stringify({ completed: !todo.completed })
	// 	})
	// 		.then((resp) => {
	// 			if (!resp.ok) {
	// 				if (resp.status >= 400 && resp.status < 500) {
	// 					// page not found or something on the server side
	// 					return resp.json().then((data) => {
	// 						let err = { errorMessage: data.message };
	// 						throw err;
	// 					});
	// 				} else {
	// 					let err = { errorMessage: 'Please try again later, server is not responding ' };
	// 					throw err;
	// 				}
	// 			}
	// 			return resp.json();
	// 		})
	// 		.then((updatedTodo) => {
	// 			const todos = this.state.todos.map(
	// 				(t) => (t._id === updatedTodo._id ? { ...t, completed: !t.completed } : t)
	// 			);
	// 			this.setState({ todos: todos });
	// 		});
	// }

	render() {
		const todos = this.state.todos.map((todo) => (
			<TodoItem
				key={todo._id}
				{...todo}
				onDelete={this.deleteTodo.bind(this, todo._id)}
				onToggle={this.toggleTodo.bind(this, todo)}
			/>
		));
		return (
			<div>
				<h1>Todo List</h1>
				<TodoForm addTodo={this.addTodo} />
				<ul>{todos}</ul>
			</div>
		);
	}
}

export default TodoList;
