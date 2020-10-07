import { ADD_TECHSECTION, REMOVE_TECHSECTION, GET_TECHSECTIONS, ADD_GURULINK, REMOVE_GURULINK } from './types';

function handleTechSections(data) {
	// debugger;
	console.log(`tech sections data returned: `);
	console.log(data);
	return {
		type: GET_TECHSECTIONS,
		data
	};
}

function handleAddTechSection(techSection) {
	// debugger;
	return {
		type: ADD_TECHSECTION,
		techSection
	};
}

function handleRemoveTechSection(id) {
	// debugger;
	return {
		type: REMOVE_TECHSECTION,
		id
	};
}

function handleAddGuruLink(techId, guruLink) {
	// debugger;
	return {
		type: ADD_GURULINK,
		techId,
		guruLink
	};
}

function handleRemoveGuruLink(techId, linkId) {
	// debugger;
	return {
		type: REMOVE_GURULINK,
		techId,
		linkId
	};
}

export function getTechSections() {
	// debugger;
	return (dispatch) => {
		// return fetch('http://localhost:4000/api/todos')
		return fetch('http://localhost:4000/api/ts')
			.then((res) => {
				console.log(`res ...`);
				console.log(res);

				return res.json();
			})
			.then((data) => dispatch(handleTechSections(data)))
			.catch((err) => console.log('SOMETHING WENT WRONG in getting tech sections!', err));
	};
}

export function addTechSection(val) {
	// debugger;
	return (dispatch) => {
		return fetch('http://localhost:4000/api/ts', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ name: val })
		})
			.then((res) => res.json())
			.then((data) => dispatch(handleAddTechSection(data)))
			.catch((err) => console.log('SOMETHING WENT WRONG', err));
	};
}

export function removeTechSection(id) {
	// debugger;
	return (dispatch) => {
		return fetch(`http://localhost:4000/api/ts/${id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((data) => dispatch(handleRemoveTechSection(id)))
			.catch((err) => console.log('SOMETHING WENT WRONG', err));
	};
}

export function addGuruLink(techId, title, url, comment) {
	// debugger;
	return (dispatch) => {
		return fetch(`http://localhost:4000/api/gl/ts/${techId}`, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ title: title, url: url, comment: comment })
		})
			.then((res) => res.json())
			.then((data) => dispatch(handleAddGuruLink(techId, data))) // data: returned guruLink object
			.catch((err) => console.log('SOMETHING WENT WRONG', err));
	};
}

export function removeGuruLink(techId, linkId) {
	// debugger;
	return (dispatch) => {
		return fetch(`http://localhost:4000/api/gl/${linkId}/ts/${techId}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((data) => dispatch(handleRemoveGuruLink(techId, linkId)))
			.catch((err) => console.log('SOMETHING WENT WRONG', err));
	};
}
