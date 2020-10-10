// import React, { Component } from 'react';
import React from 'react';

const Todo = ({ task, removeTodo, isAdmin }) => (
	<li>
		{task}
		{isAdmin && <button onClick={removeTodo}>X</button>}
	</li>
);

export default Todo;
