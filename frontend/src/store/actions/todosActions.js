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
				dispatch(loadTodos(res));
			})
			.catch((err) => {
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
			dispatch(addError(err.message));
		});
};

export const removeTodo = (id) => {
	return (dispatch) => {
		return apiCall('delete', `/api/todos/${id}`)
			.then(() => dispatch(remove(id)))
			.catch((err) => dispatch(addError(err.message)));
	};
};
