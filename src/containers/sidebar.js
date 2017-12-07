import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';

import '../css/interior.css';

class Sidebar extends Component {
	componentWillMount() {
		this.props.fetchPosts();
	}

	renderNav() {
		let products = this.props.products;
		let navObject = {};
		let categories = [];

		// Separates products into unique categories
		products.forEach(product => {
			if (!navObject[product.category]) {
				navObject[product.category] = [];
			}

			navObject[product.category].push(product._id);
			if (categories.indexOf(product.category) < 0) {
				categories.push(product.category);
			}
		});

		return categories.map(category => {
			return (
				<ul className="list-unstyled interior-nav-title" key={category}>
					{category}
					{navObject[category].map(product => {
						return (
							<li className="interior-nav-item" key={product}>
								<Link to={`/ecommerce/main/products/product/${product}`}>
									{product}
								</Link>
							</li>
						);
					})}
				</ul>
			);
		});
	}

	render() {
		return (
			<div className="col-sm-2">
				{this.props.products ? this.renderNav() : <span>Loading..</span>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { products: state.products };
}

export default connect(mapStateToProps, { fetchPosts })(Sidebar);
