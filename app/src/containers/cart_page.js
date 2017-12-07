import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCart, deleteCart } from '../actions';

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

	deleteItem(item) {
		this.props.deleteCart(item);
	}

	render() {
		return (
			<div className="col-10 cart-container">
				<div className="row">
					<div className="col-12">
						<h2 className="text-center">
							{this.props.cart.length > 0
								? 'Your Shopping Bag'
								: 'Your Bag is Empty'}
						</h2>
					</div>
				</div>
				<CartDetails
					deleteItem={this.deleteItem.bind(this)}
					cart={this.props.cart}
				/>

				{this.props.cart.length > 0 ? (
					<div className="row push-down">
						<div className="col-lg-2">
							<button className="btn btn-block button-add-to-bag">
								Checkout
							</button>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { cart: state.cart };
}

export default connect(mapStateToProps, { fetchCart, deleteCart })(CartPage);
