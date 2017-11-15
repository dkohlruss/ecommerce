import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';

import '../css/interior.css';

class ProductsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sortBy: ''
		};
	}

	componentDidMount() {
		this.props.fetchPosts();
	}

	orderProducts(products) {
		switch (this.state.sortBy) {
			case 'Price Asc':
				return _.orderBy(products, ['price'], ['asc']);
			case 'Price Desc':
				return _.orderBy(products, ['price'], ['desc']);
			case 'Name AZ':
				return _.orderBy(products, ['_id'], ['asc']);
			case 'Name ZA':
				return _.orderBy(products, ['_id'], ['desc']);
			default:
				return products;
		}
	}

	// TODO: CREATE DUMB COMPONENT THAT RECEIVES PRODUCT INFO, SORTBY...
	renderProducts(category) {
		let { products } = this.props;

		products = this.orderProducts(products);

		return products.map(product => {
			if (product.category === category || !category) {
				return (
					<div
						key={`${product._id}detail`}
						className="col-lg-4 col-md-6 text-center product-mosaic-detail"
					>
						<img src="http://via.placeholder.com/200x200" alt="Placeholder" />{' '}
						<br />
						<span className="product-mosaic-title">{product._id}</span> <br />
						<span className="gold-dash">-</span>
						<br />
						{product.price}
					</div>
				);
			}
		});
	}

	sortProducts(command) {
		this.setState({ sortBy: command });
	}

	render() {
		let { category } = this.props.match.params;

		return (
			<div className="col-10 product-mosaic">
				<div className="row">
					<div className="col-12">
						<button onClick={() => this.sortProducts('Name AZ')}>A-Z</button>
						<button onClick={() => this.sortProducts('Name ZA')}>Z-A</button>
					</div>
					<div className="col-12 text-center">
						<h2>{category ? _.capitalize(category) : 'Some Items We Like'}</h2>
					</div>
				</div>
				<div className="row">
					{this.props.products ? (
						this.renderProducts(_.capitalize(category))
					) : (
						<span />
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

export default connect(mapStateToProps, { fetchPosts })(ProductsPage);
