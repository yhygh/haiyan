import { CLOSE_SIDEDRAWER, TOGGLE_SIDEDRAWER } from '../actions/types';

export default (state = { sideDrawerOpen: false }, action) => {
	switch (action.type) {
		case CLOSE_SIDEDRAWER:
			return { ...state, sideDrawerOpen: false };
		case TOGGLE_SIDEDRAWER:
			return { ...state, sideDrawerOpen: !state.sideDrawerOpen };
		default:
			return state;
	}
};
