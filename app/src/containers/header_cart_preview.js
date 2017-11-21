import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addCart, fetchCart } from '../actions';

class CartPreview extends Component {
	constructor(props) {
		super(props);

		this.state = { cartCount: 0 };
	}

	componentWillMount() {
		this.props.fetchCart();
	}

	componentWillReceiveProps(newProps) {
		let cartCount = 0;
		for (let i = 0; i < newProps.cart.length; i++) {
			cartCount += newProps.cart[i].quantity;
		}
		this.setState({ cartCount });
	}

	render() {
		console.log(this.props);
		return (
			<span className="header-account-text">
				{this.state.cartCount > 0 ? (
					<span>
						YOUR CART:
						<span className="cart-circle">{this.state.cartCount}</span>{' '}
					</span>
				) : (
					<span>EMPTY CART</span>
				)}
			</span>
		);
	}
}

function mapStateToProps(state) {
	return { cart: state.cart };
}

export default connect(mapStateToProps, { addCart, fetchCart })(CartPreview);
