import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TechSections from './TechSections';
import TodoList from './TodoList';

const Home = () => <div>Haiyan Home</div>;

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/todos" component={TodoList} />
						<Route path="/techinfo" component={TechSections} />
						<TechSections />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
