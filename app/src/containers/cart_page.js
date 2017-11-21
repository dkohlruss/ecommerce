import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCart } from '../actions';

import CartDetails from '../components/cart_details';

class CartPage extends Component {
	constructor(props) {
		super(props);
		this.state = { cart: null };
	}

	componentWillMount() {
		this.props.fetchCart();
	}

	componentWilLReceiveProps(newProps) {
		if (newProps.cart !== this.props.cart) {
			this.setState({ cart: newProps.cart });
		}
	}

	render() {
		return (
			<div className="col-10">
				<div className="row">
					<div className="col-12">
						<h2 className="text-center">Your Shopping Bag</h2>
					</div>
				</div>
				<CartDetails cart={this.props.cart} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { cart: state.cart };
}

export default connect(mapStateToProps, { fetchCart })(CartPage);
