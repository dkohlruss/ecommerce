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
		return (
			<span className="header-account-text header-account-link">
				{this.state.cartCount > 0 ? (
					<span>
						<Link to={'/main/cart'}>
							YOUR CART:
							<span className="cart-circle">{' ' + this.state.cartCount}</span>
						</Link>
					</span>
				) : (
					<Link to={'/main/cart'}>
						<span>EMPTY CART</span>
					</Link>
				)}
			</span>
		);
	}
}

function mapStateToProps(state) {
	return { cart: state.cart };
}

export default connect(mapStateToProps, { addCart, fetchCart })(CartPreview);
