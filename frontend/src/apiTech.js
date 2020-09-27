const APITSURL = '/api/ts/';
const APIGLURL = '/api/gl/';

export async function getTechSections() {
	return fetch(APITSURL).then((resp) => {
		if (!resp.ok) {
			if (resp.status >= 400 && resp.status < 500) {
				// page not found or something on the server side
				return resp.json().then((data) => {
					let err = { errorMessage: data.message };
					throw err;
				});
			} else {
				let err = { errorMessage: 'Please try again later, server is not responding ' };
				throw err;
			}
		}
		return resp.json();
	});
}

export async function createTechSection(val) {
	return fetch(APITSURL, {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ name: val })
	}).then((resp) => {
		if (!resp.ok) {
			if (resp.status >= 400 && resp.status < 500) {
				// page not found or something on the server side
				return resp.json().then((data) => {
					let err = { errorMessage: data.message };
					throw err;
				});
			} else {
				let err = { errorMessage: 'Please try again later, server is not responding ' };
				throw err;
			}
		}
		return resp.json();
	});
}

export async function removeTechSection(id) {
	const deleteURL = APITSURL + id;
	return fetch(deleteURL, {
		method: 'delete'
	}).then((resp) => {
		if (!resp.ok) {
			if (resp.status >= 400 && resp.status < 500) {
				// page not found or something on the server side
				return resp.json().then((data) => {
					let err = { errorMessage: data.message };
					throw err;
				});
			} else {
				let err = { errorMessage: 'Please try again later, server is not responding ' };
				throw err;
			}
		}
		return resp.json();
	});
}

// To complete this function
export async function updateTechSection(techSection) {
	const updateURL = APITSURL + techSection._id;
	return fetch(updateURL, {
		method: 'put',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ completed: !techSection.completed })
	}).then((resp) => {
		if (!resp.ok) {
			if (resp.status >= 400 && resp.status < 500) {
				// page not found or something on the server side
				return resp.json().then((data) => {
					let err = { errorMessage: data.message };
					throw err;
				});
			} else {
				let err = { errorMessage: 'Please try again later, server is not responding ' };
				throw err;
			}
		}
		return resp.json();
	});
}

export async function createGuruLink(techId, titleval, urlval, commentval) {
	const createGLURL = APIGLURL + 'ts/' + techId;
	console.log(`createGLURL = ${createGLURL}`);
	return fetch(createGLURL, {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ title: titleval, url: urlval, comment: commentval })
	}).then((resp) => {
		if (!resp.ok) {
			if (resp.status >= 400 && resp.status < 500) {
				// page not found or something on the server side
				return resp.json().then((data) => {
					let err = { errorMessage: data.message };
					throw err;
				});
			} else {
				let err = { errorMessage: 'Please try again later, server is not responding ' };
				throw err;
			}
		}
		return resp.json();
	});
}

export async function removeGuruLink(techId, linkId) {
	const deleteURL = APIGLURL + linkId + '/ts/' + techId;
	return fetch(deleteURL, {
		method: 'delete'
	}).then((resp) => {
		if (!resp.ok) {
			if (resp.status >= 400 && resp.status < 500) {
				// page not found or something on the server side
				return resp.json().then((data) => {
					let err = { errorMessage: data.message };
					throw err;
				});
			} else {
				let err = { errorMessage: 'Please try again later, server is not responding ' };
				throw err;
			}
		}
		return resp.json();
	});
}
