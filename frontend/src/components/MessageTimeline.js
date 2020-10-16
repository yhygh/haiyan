import React from 'react';
import MessageList from '../containers/MessageList';

const MessageTimeline = (props) => {
	return (
		<div className="message-history">
			<MessageList />
		</div>
	);
};

export default MessageTimeline;
