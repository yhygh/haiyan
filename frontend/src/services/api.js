import axios from 'axios';

export function setTokenHeader(token) {
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}

/**
 * A wrapper around axios API call that formats errors, etc
 * @param {string} method the HTTP verb you want to use
 * @param {string} path the route path / endpoint
 * @param {object} data {optional} data in JSON form for POST requests
 */
export function apiCall(method, path, data) {
	console.log(`inside apiCall ...`);
	// debugger;
	console.log(method);
	console.log(path);
	console.log(data);
	return new Promise((resolve, reject) => {
		return axios
			[method.toLowerCase()](path, data)
			.then((res) => {
				return resolve(res.data);
			})
			.catch((err) => {
				console.log(err.response);
				return reject(err.response.data.error);
			});
	});
}
