import React, { Component } from 'react';

const CartDetails = props => {
	console.log(props);
	if (props.cart.length > 0) {
		return props.cart.map(item => {
			return (
				<div className="row" key={item.name}>
					<div className="col-md-2">Placeholder</div>
					<div className="col-md-8">
						<span className="cart-item">{item.name}</span>

						<span className="cart-qty">Quantity: {item.quantity}</span>
					</div>
					<div className="col-md-2">
						<button
							className="btn btn-block button-add-to-bag"
							onClick={() => props.deleteItem(item)}
						>
							Delete
						</button>
					</div>
				</div>
			);
		});
	} else {
		return null;
	}
};

export default CartDetails;
