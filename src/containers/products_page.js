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

	componentWillMount() {
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
						<Link to={`/ecommerce/main/products/product/${product._id}`}>
							<img src=`"${product.images[0]}"` alt="Product Preview" />
							<br />
							<span className="product-mosaic-title">{product._id}</span>
						</Link>
						<br />
						<span className="gold-dash">-</span>
						<br />
						{product.price}
					</div>
				);
			}

			return <div />;
		});
	}

	sortProducts(value) {
		this.setState({ sortBy: value });
	}

	render() {
		let { category } = this.props.match.params;

		return (
			<div className="col-10 product-mosaic">
				<div className="row">
					<div className="col-12 text-right">
						<select
							name="filter"
							className="product-select"
							defaultValue="filter"
							onChange={event => this.sortProducts(event.target.value)}
						>
							<option value="filter" disabled>
								Filter By...
							</option>
							<option value="none">None</option>
							<option value="Name AZ">Name: A-Z</option>
							<option value="Name ZA">Name: Z-A</option>
							<option value="Price Desc">Price: High to Low</option>
							<option value="Price Asc">Price: Low to High</option>
						</select>
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
