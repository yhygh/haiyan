import { CLOSE_SIDEDRAWER, TOGGLE_SIDEDRAWER } from '../actions/types';

export const closeSidedrawer = () => ({
	type: CLOSE_SIDEDRAWER
});

export const toggleSidedrawer = (status) => ({
	type: TOGGLE_SIDEDRAWER,
	status
});
