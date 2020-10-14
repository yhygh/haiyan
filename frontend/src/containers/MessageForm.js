import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions';

class MessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
	}

	handleNewMessage = (event) => {
		event.preventDefault();
		this.props.postNewMessage(this.state.message);
		this.setState({ message: '' });
		// this.props.history.push('/');
		this.props.history.goBack();
	};

	render() {
		return (
			<form onSubmit={this.handleNewMessage}>
				{this.props.errors.message && <div className="alert alert-danger">{this.props.errors}</div>}
				{/* <input */}
				<textarea
					type="text"
					className="form-control"
					value={this.state.message}
					onChange={(e) => this.setState({ message: e.target.value })}
				/>
				<button type="submit" className="btn btn-success pull-right">
					Please leave your suggestions!
				</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.errors
	};
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
