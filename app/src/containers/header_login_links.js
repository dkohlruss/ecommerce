import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin, userRegister } from '../actions';

class HeaderLogins extends Component {
	componentDidMount() {
		this.props.userLogin({ username: 'dave1235', password: '123456' });
	}

	render() {
		if (!this.props.user) {
			return null;
		}

		return null;
	}
}

function mapStateToProps(state) {
	return { user: state.user.data };
}

export default connect(mapStateToProps, { userLogin, userRegister })(
	HeaderLogins
);
