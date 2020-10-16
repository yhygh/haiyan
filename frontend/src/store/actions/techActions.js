import { apiCall } from '../../services/api';
import { addError } from './errorsActions';

import { ADD_TECHSECTION, REMOVE_TECHSECTION, GET_TECHSECTIONS, ADD_GURULINK, REMOVE_GURULINK } from './types';

export const loadTechSections = (data) => ({
	type: GET_TECHSECTIONS,
	data
});

export const addNewTechSection = (techSection) => ({
	type: ADD_TECHSECTION,
	techSection
});

export const fetchTechSections = () => {
	return (dispatch) => {
		return apiCall('get', '/api/ts')
			.then((res) => {
				dispatch(loadTechSections(res));
			})
			.catch((err) => {
				console.log(`techSections fetch, error is ${err}`);
				dispatch(addError(err.message));
			});
	};
};

export const addTechSection = (val) => (dispatch) => {
	return apiCall('post', '/api/ts', { name: val })
		.then((res) => {
			console.log(res);
			dispatch(addNewTechSection(res));
		})
		.catch((err) => {
			// debugger;
			dispatch(addError(err.message));
		});
};

export const handleRemoveTechSection = (id) => ({
	// debugger;
	type: REMOVE_TECHSECTION,
	id
});

export const removeTechSection = (id) => {
	return (dispatch) => {
		return apiCall('delete', `/api/ts/${id}`)
			.then(() => dispatch(handleRemoveTechSection(id)))
			.catch((err) => dispatch(addError(err.message)));
	};
};

export const handleAddGuruLink = (techId, guruLink) => ({
	type: ADD_GURULINK,
	techId,
	guruLink
});

export const addGuruLink = (techId, title, url, comment) => (dispatch) => {
	// debugger;
	return apiCall('post', `/api/gl/ts/${techId}`, { title, url, comment })
		.then((res) => {
			console.log(res);
			dispatch(handleAddGuruLink(techId, res)); // res is the returned guruLink obj
		})
		.catch((err) => {
			// debugger;
			dispatch(addError(err.message));
		});
};

export const handleRemoveGuruLink = (techId, linkId) => ({
	type: REMOVE_GURULINK,
	techId,
	linkId
});

export const removeGuruLink = (techId, linkId) => {
	return (dispatch) => {
		return apiCall('delete', `/api/gl/${linkId}/ts/${techId}`)
			.then(() => dispatch(handleRemoveGuruLink(techId, linkId)))
			.catch((err) => dispatch(addError(err.message)));
	};
};
