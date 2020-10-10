import { apiCall } from '../../services/api';
import { addError } from './errorsActions';

import { ADD_TODO, REMOVE_TODO, GET_TODOS } from './types';

export const loadTodos = (todos) => ({
	type: GET_TODOS,
	todos
});

export const remove = (id) => ({
	type: REMOVE_TODO,
	id
});

export const addNewTodo = (todo) => ({
	type: ADD_TODO,
	todo
});

export const fetchTodos = () => {
	return (dispatch) => {
		return apiCall('get', '/api/todos')
			.then((res) => {
				console.log(`inside todosActions fetch response: ${res}`);
				dispatch(loadTodos(res));
			})
			.catch((err) => {
				console.log(`inside todoActions fetch, error is ${err}`);
				dispatch(addError(err.message));
			});
	};
};

export const addTodo = (task) => (dispatch) => {
	return apiCall('post', '/api/todos', { task })
		.then((res) => {
			console.log(`inside todosActions, addTodo res: `);
			console.log(res);
			dispatch(addNewTodo(res));
		})
		.catch((err) => {
			// debugger;
			dispatch(addError(err.message));
		});
};

// function handleAdd(todo) {
// 	// debugger;
// 	return {
// 		type: ADD_TODO,
// 		todo
// 	};
// }

// export function addTodo(task) {
// 	// debugger;
// 	return (dispatch) => {
// 		return fetch('http://localhost:4000/api/todos', {
// 			method: 'POST',
// 			headers: new Headers({
// 				'Content-Type': 'application/json'
// 			}),
// 			body: JSON.stringify({ task })
// 		})
// 			.then((res) => res.json())
// 			.then((data) => dispatch(handleAdd(data)))
// 			.catch((err) => console.log('SOMETHING WENT WRONG', err));
// 	};
// }

export const removeTodo = (id) => {
	return (dispatch) => {
		return apiCall('delete', `/api/todos/${id}`)
			.then(() => dispatch(remove(id)))
			.catch((err) => dispatch(addError(err.message)));
	};
};
