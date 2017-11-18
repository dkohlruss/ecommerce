import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCart } from '../actions';

class ProductButton extends Component {
	constructor(props) {
		super(props);
	}

	clickButton() {
		console.log(this.props.product);
		this.props.addCart(this.props.product);
	}

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
		console.log(this.props);
		let button = this.createButton();

		return <div className="col-12 product-section">{button}</div>;
	}
}

export default connect(null, { addCart })(ProductButton);
