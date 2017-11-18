import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCart, fetchCart } from '../actions';

class CartPreview extends Component {
	constructor(props) {
		super(props);

		this.state = { cartCount: 0 };
	}
	componentDidMount() {
		this.props.fetchCart();
	}

	componentWillReceiveProps(newProps) {
		this.setState({ cartCount: newProps.cart.length });
	}

	render() {
		return (
			<span className="header-account-text">
				{this.state.cartCount > 0 ? (
					<span>
						IN CART: <span className="cart-circle">{this.state.cartCount}</span>
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
