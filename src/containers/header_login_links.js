import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin, userRegister, userLogout, fetchUser } from '../actions';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		minWidth: '350px'
	}
};

/*
	This component contains the links for user login/registration, as well as the modal for user login/registration.
	props from redux:
		login: user login data
		fetchUser(): fetches user data
*/
class HeaderLogins extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			modalIsOpen: false,
			username: '',
			password: '',
			newUser: false,
			loginMessage: ''
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.notLoggedIn = [
			<span
				className="header-account-text header-account-link"
				key="Login"
				onClick={this.openModal}
			>
				LOGIN
			</span>,
			<span
				className="header-account-text header-account-link"
				key="Register"
				onClick={this.openModal}
			>
				REGISTER
			</span>
		];

		this.adminLoggedIn = [
			<Link to={'/ecommerce/admin'} key="Admin">
				<span className="header-account-text header-account-link">
					ADMINISTRATION
				</span>
			</Link>
		];
	}

	openModal(event) {
		if (event.target.innerHTML !== 'LOGIN') {
			this.setState({
				newUser: true,
				modalIsOpen: true
			});
		} else {
			this.setState({ newUser: false, modalIsOpen: true });
		}
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	// Gets user data when component initially mounts
	componentWillMount() {
		this.props.fetchUser();
	}

	componentWillReceiveProps(newProps) {
		if (
			newProps.login &&
			newProps.login.data &&
			newProps.login.data.success &&
			this.state.user !== newProps.login.data.user.username
		) {
			this.setState({ user: newProps.login.data.user.username });
		}

		if (
			newProps.login &&
			newProps.login.response &&
			!newProps.login.response.data.success
		) {
			this.setState({ loginMessage: newProps.login.response.data.message });
		}
	}

	handleUserChange(event) {
		this.setState({ username: event.target.value });
	}

	handlePassChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		let params = {
			username: this.state.username,
			password: this.state.password
		};

		if (this.state.newUser) {
			this.props.userRegister(params);
		} else {
			this.props.userLogin(params);
		}
	}

	// Message to be displayed if user has successfully logged in
	getLoggedIn() {
		return [
			<span className="header-account-text" key="LoggedIn">
				LOGGED IN AS {this.state.user}
			</span>,
			<span
				className="header-account-text header-account-link"
				key="LogOut"
				onClick={this.userLogout.bind(this)}
			>
				LOG OUT
			</span>
		];
	}

	userLogout() {
		this.setState({ modalIsOpen: false });
		this.props.userLogout();
	}

	render() {
		let loggedIn = this.getLoggedIn();
		let notLoggedIn = this.notLoggedIn;
		if (
			this.props.login &&
			this.props.login.data &&
			this.props.login.data.success &&
			this.props.login.data.user.level !== 1
		) {
			return loggedIn;
		} else if (
			this.props.login &&
			this.props.login.data &&
			this.props.login.data.success &&
			this.props.login.data.user.level === 1
		) {
			return loggedIn.concat(this.adminLoggedIn);
		}

		// onRequestClose={this.closeModal}
		return (
			<span>
				{notLoggedIn}
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					style={customStyles}
				>
					<div className="row">
						<div className="col-10 text-center">
							<h2>{this.state.newUser ? 'Register' : 'Login'}</h2>
						</div>
						<div className="col-2 modal-btn">
							<button
								className="btn btn-outline-danger btn-sm"
								onClick={this.closeModal}
							>
								X
							</button>
						</div>
					</div>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Username</label>
							<input
								type="text"
								className="form-control"
								name="username"
								id="username"
								placeholder="Username"
								value={this.state.name}
								onChange={this.handleUserChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input
								type="password"
								className="form-control"
								name="password"
								id="password"
								placeholder="Password"
								value={this.state.password}
								onChange={this.handlePassChange}
							/>
						</div>
						<div className="row">
							<div className="col-4">
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
							</div>
							<div className="col-8 text-center">
								<span className="cart-qty">{this.state.loginMessage}</span>
							</div>
						</div>
					</form>
				</Modal>
			</span>
		);
	}
}

function mapStateToProps(state) {
	return { login: state.user };
}

export default connect(mapStateToProps, {
	userLogin,
	userRegister,
	userLogout,
	fetchUser
})(HeaderLogins);
