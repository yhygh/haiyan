import React, { Component } from 'react';
import GuruLinkForm from './GuruLinkForm';
import { Link, Route } from 'react-router-dom';

import { connect } from 'react-redux';

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
			<div className="main-grid-item">
				<div className="category-grid-item category-grid-item-title">{this.props.name}</div>

				{currentUser.isAuthenticated && currentUser.user.isAdmin ? (
					<div>
						<Link to={newGurulinkPath}>Add a new Link</Link>
						<button onClick={this.props.onDelete}> Delete This Section </button>
					</div>
				) : null}

				<Route
					path={newGurulinkPath}
					component={(props) => <GuruLinkForm {...props} addGuruLink={this.addGuruLink} />}
				/>

				{this.props.links.map((link) => (
					<div className="category-grid-item" key={link._id}>
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
			</div>
		);
	}
}

export default connect(null, { addGuruLink, removeGuruLink })(TechSection);
