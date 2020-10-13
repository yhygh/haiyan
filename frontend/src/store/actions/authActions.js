import { apiCall, setTokenHeader } from '../../services/api';

import { SET_CURRENT_USER } from './types';
import { addError, removeError } from './errorsActions';

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}

export function setAuthorizationToken(token) {
	setTokenHeader(token);
}

export function logout() {
	return (dispatch) => {
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
}

export function authUser(type, userData) {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			return apiCall('post', `/api/auth/${type}`, userData)
				.then(({ token, ...user }) => {
					console.log(`authUser user: `);
					console.log(user);

					localStorage.setItem('jwtToken', token);
					setAuthorizationToken(token);
					dispatch(setCurrentUser(user));
					dispatch(removeError());
					resolve(); // indicate the API call succeeded
				})
				.catch((err) => {
					dispatch(addError(err.message));
					reject(); // indicate the API call failed
				});
		});
	};
}
