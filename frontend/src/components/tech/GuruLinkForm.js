import React, { Component } from 'react';

class GuruLinkForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'Link Title',
			url: '',
			comment: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const value = e.target.value;
		const name = e.target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit() {
		const state = this.state;
		console.log(`GuruLinkForm submit before ... ${state}`);
		// this.props.addGuruLink(this.props.techId, state.title, state.url, state.comment);
		this.props.addGuruLink(state.title, state.url, state.comment);
		console.log(state.input);
		this.props.history.push('/techinfo');
	}

	render() {
		return (
			<div>
				<form>
					<input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
					<input name="url" type="text" value={this.state.url} onChange={this.handleChange} />
					<input name="comment" type="text" value={this.state.comment} onChange={this.handleChange} />
					<button onClick={this.handleSubmit}>Create Guru Link</button>
				</form>
			</div>
		);
	}
}

export default GuruLinkForm;
