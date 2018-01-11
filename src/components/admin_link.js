import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// This renders only if a user logs in with admin permissions
class AdminLink extends Component {
	render() {
		return (
			<Link to={'/ecommerce/admin'}>
				<span className="header-account-text" key="Admin">
					ADMINISTRATION
				</span>
			</Link>
		);
	}
}

export default AdminLink;
