import React, { Component } from 'react';

const CartDetails = props => {
	console.log(props);

	if (props.cart) {
		return props.cart.map(item => {
			return (
				<div className="row" key={item.name}>
					<div className="col-md-2">Placeholder</div>
					<div className="col-md-8">
						{item.name}, {item.quantity}
					</div>
					<div className="col-md-2">Remove Button</div>
				</div>
			);
		});
	}

	return <div>Balls</div>;
};

export default CartDetails;
