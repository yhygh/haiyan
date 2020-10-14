import React, { Component } from 'react';
import GuruLinkForm from './GuruLinkForm';
import { Link, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import requireAuth from '../../hocs/requireAuth';

import { addGuruLink, removeGuruLink } from '../../store/actions';

// import ErrorBoundary from '../ErrorBoundary';

class TechSection extends Component {
	constructor(props) {
		super(props);
		// bind techSection id
		this.addGuruLink = this.props.addGuruLink.bind(this, props._id);
		this.removeGuruLink = this.props.removeGuruLink.bind(this, props._id);
	}

	render() {
		const currentUser = this.props.currentUser;
		const newGurulinkPath = `/techinfo/${this.props._id}/gurulink/new`;
		return (
			<div style={{ background: '#e3aa91' }}>
				<p>{this.props.name}</p>

				{currentUser.isAuthenticated && currentUser.user.isAdmin ? (
					<Link to={newGurulinkPath}>Add a new Link</Link>
				) : null}

				<Route
					path={newGurulinkPath}
					component={(props) => <GuruLinkForm {...props} addGuruLink={this.addGuruLink} />}
				/>

				{this.props.links.map((link) => (
					<div key={link._id}>
						<div>
							<a href={link.url}>{link.title}</a>
						</div>
						<div>{link.comment}</div>

						{currentUser.isAuthenticated && currentUser.user.isAdmin ? (
							<div>
								<span>
									<button onClick={this.removeGuruLink.bind(this, link._id)}>Delete Link</button>
								</span>
							</div>
						) : null}
					</div>
				))}

				{currentUser.isAuthenticated && currentUser.user.isAdmin ? (
					<div>
						<button onClick={this.props.onDelete}> Delete This Section </button>
					</div>
				) : null}

				<p>------------------------------</p>
			</div>
		);
	}
}

export default connect(null, { addGuruLink, removeGuruLink })(TechSection);
