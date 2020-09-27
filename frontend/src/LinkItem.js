import React from 'react';

const LinkItem = ({ name, url, comment, onDelete, onUpdate }) => (
	<li>
		<div
			style={{
				textDecoration: completed ? 'line-through' : 'none'
			}}
			onClick={onUpdate}
		>
			{title}
		</div>
		<span onClick={onDelete}> X </span>
	</li>
);

export default LinkItem;
