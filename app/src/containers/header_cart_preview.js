import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCart, fetchCart } from '../actions';

class CartPreview extends Component {
	componentDidMount() {
		this.props.fetchCart();
	}

	componentWillReceiveProps() {
		console.log(this.props);
	}

	render() {
		return (
			<span className="header-account-text">
				Cart: {this.props.cart.length}
			</span>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return { cart: state.cart };
}

export default connect(mapStateToProps, { addCart, fetchCart })(CartPreview);
