import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin, userRegister, userLogout, fetchUser } from '../actions';

class HeaderLogins extends Component {
	constructor(props) {
		super(props);

		this.state = { user: null };

		this.notLoggedIn = [
			<span
				className="header-account-text"
				key="Login"
				onClick={this.userLogin.bind(this)}
			>
				LOGIN
			</span>,
			<span className="header-account-text" key="Register">
				REGISTER
			</span>
		];

		this.adminLoggedIn = [
			<span className="header-account-text" key="Admin">
				ADMINISTRATION
			</span>
		];
	}

	componentWillMount() {
		this.props.fetchUser();
	}

	componentWillReceiveProps(newProps) {
		if (newProps.user && this.state.user !== newProps.user.username) {
			this.setState({ user: newProps.user.username });
		}
	}

	getLoggedIn() {
		return [
			<span className="header-account-text" key="LoggedIn">
				LOGGED IN AS {this.state.user}
			</span>,
			<span
				className="header-account-text"
				key="LogOut"
				onClick={this.userLogout.bind(this)}
			>
				LOG OUT
			</span>
		];
	}

	userLogout() {
		this.props.userLogout();
	}

	userLogin() {
		this.props.userLogin({ username: 'dave1235', password: '123456' });
	}

	render() {
		console.log(this.props);
		let loggedIn = this.getLoggedIn();

		if (this.props.user && this.props.user.level !== 1) {
			return loggedIn;
		} else if (this.props.user && this.props.user.level === 1) {
			return loggedIn.concat(this.adminLoggedIn);
		}

		return this.notLoggedIn;
	}
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps, {
	userLogin,
	userRegister,
	userLogout,
	fetchUser
})(HeaderLogins);
