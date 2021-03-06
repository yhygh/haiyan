import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import techReducer from './techReducer';
import currentUserReducer from './currentUserReducer';
import errorsReducer from './errorsReducer';
import messagesReducer from './messagesReducer';
import sidedrawerReducer from './sidedrawerReducer';

export default combineReducers({
	todos: todosReducer,
	tech: techReducer,
	currentUser: currentUserReducer,
	errors: errorsReducer,
	messages: messagesReducer,
	sideDrawer: sidedrawerReducer
});
