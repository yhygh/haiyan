import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';

import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { setAuthorizationToken, setCurrentUser } from './store/actions/auth';
import JwtDecode from 'jwt-decode';

const store = configureStore();

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	// prevent someone from manually tampering with the key of jwtToken in localStorage
	try {
		store.dispatch(setCurrentUser(JwtDecode(localStorage.jwtToken)));
	} catch (e) {
		store.dispatch(setCurrentUser({}));
	}
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
