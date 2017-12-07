import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminLink extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Link to={'/admin'}>
				<span className="header-account-text" key="Admin">
					ADMINISTRATION
				</span>
			</Link>
		);
	}
}

export default AdminLink;
