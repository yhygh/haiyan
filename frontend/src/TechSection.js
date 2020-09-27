import React, { Component } from 'react';
// import React from 'react';
import GuruLinkForm from './GuruLinkForm';

import * as apiCalls from './apiTech';

class TechSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			techId: props._id,
			links: props.links
		};
		console.log(`TechSection props:`);
		console.log(props._id);
		console.log(this.state);
		this.addGuruLink = this.addGuruLink.bind(this);
		this.deleteGuruLink = this.deleteGuruLink.bind(this);
	}

	async addGuruLink(title, url, comment) {
		console.log(`addGuruLink called ... title=${title}`);
		// const techId = this.props._id;
		const techId = this.state.techId;
		await apiCalls.createGuruLink(techId, title, url, comment);
	}

	async deleteGuruLink(linkId) {
		const techId = this.props._id;
		console.log(`calling deleteGuruLink, techId=${techId} linkId=${linkId}`);
		await apiCalls.removeGuruLink(techId, linkId);
		const links = this.state.links.filter((link) => link._id !== linkId);
		this.setState({ links: links });
	}

	// TO BE COMPLETED
	// async updateGuruLink(linkId) {
	// 	console.log(`calling updateGuruLink, linkId=${linkId}`);
	// 	await apiCalls.removeGuruLink(techId, linkId);
	// 	const links = this.state.links.filter((link) => link._id !== linkId);
	// 	this.setState({ links: links });
	// }

	render() {
		return (
			<div style={{ background: 'green' }}>
				<p>{this.props.name}</p>
				<GuruLinkForm addGuruLink={this.addGuruLink} />

				{this.state.links.map((link) => (
					<div key={link._id}>
						<div>
							<a href={link.url}>{link.title}</a>
						</div>
						<div>{link.comment}</div>
						<div>
							<span>
								<button onClick={this.deleteGuruLink.bind(this, link._id)}>Delete Link</button>
							</span>
							<span>
								<button>Update Link</button>
							</span>
						</div>
					</div>
				))}
				<button onClick={this.props.onDelete}> Delete This Section </button>
			</div>
		);
	}
}

export default TechSection;
