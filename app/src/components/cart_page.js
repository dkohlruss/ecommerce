import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CartPage extends Component {
	render() {
		return (
			<div className="col-10">
				<div className="row">
					<div className="col-12">YOUR SHOPPING BAG</div>
				</div>
				<div className="row">
					<div class="col-md-4">Photo</div>
					<div class="col-md-6">Description</div>
					<div class="col-md-2 text-center">Remove</div>
				</div>
			</div>
		);
	}
}

export default CartPage;
