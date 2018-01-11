import React, { Component } from 'react';

/*
	props:
		product: A product object containing name, price, fetchCart
		size: The size of the current selected product
		stock: The number of a product available
*/
class ProductButton extends Component {
	clickButton() {
		let product = {};
		product.name = this.props.product.name;
		product.size = this.props.size;
		product.price = this.props.product.price;
		this.props.addCart(product);
	}

	// Returns a button JSX element with different properties depending on whether or not
	// a product is available and if a product size has been selected
	createButton() {
		if (this.props.stock > 0) {
			return (
				<button
					className="btn btn-block button-add-to-bag"
					onClick={this.clickButton.bind(this)}
				>
					ADD TO BAG
				</button>
			);
		} else if (!this.props.size) {
			return (
				<button className="btn btn-block button-add-to-bag" disabled>
					SELECT SIZE
				</button>
			);
		} else {
			return (
				<button className="btn btn-block button-add-to-bag" disabled>
					NOT AVAILABLE
				</button>
			);
		}
	}

	render() {
		let button = this.createButton();

		return <div className="col-12 product-section">{button}</div>;
	}
}

export default ProductButton;
