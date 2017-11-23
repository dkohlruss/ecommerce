import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchProduct, fetchUser } from '../actions';

class AdminProduct extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			designer: '',
			category: '',
			price: 0,
			description: '',
			sizes: [],
			stock: []
		};
	}
	componentWillMount() {
		let productName = this.props.match.params.page;
		this.props.fetchProduct(productName);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.product !== this.props.product) {
		}
	}

	render() {
		if (!this.props.user || this.props.user.level !== 1) {
			return (
				<div className="cart-container">
					<span>You do not have access to this area.</span>
				</div>
			);
		} else {
			return (
				<div className="col-10 cart-container">
					<h2 className="text-center">
						{this.props.product ? this.props.product.name : null}
					</h2>
					<div className="row">
						<div className="col-12">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">Username</label>
									<input
										type="text"
										className="form-control"
										name="username"
										id="username"
										placeholder="Username"
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
									/>
								</div>
								<button type="submit" className="btn btn-primary">
									Update
								</button>
								<button type="submit" className="btn btn-danger">
									Delete
								</button>
							</form>
						</div>
					</div>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		product: state.product,
		user: state.user
	};
}

export default connect(mapStateToProps, { fetchProduct, fetchUser })(
	AdminProduct
);
