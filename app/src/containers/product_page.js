import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../actions';

import ProductSizes from '../components/product_sizes';
import ProductButton from '../components/product_button';

class ProductPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSize: null,
			selectedStock: null
		};
	}

	componentDidMount() {
		let { productName } = this.props.match.params;
		this.props.fetchProduct(productName);
	}

	componentWillReceiveProps(nextProps) {
		let oldName = this.props.match.params.productName;
		let { productName } = nextProps.match.params;
		if (oldName !== productName) {
			this.props.fetchProduct(productName);
			this.setState({
				selectedSize: null,
				selectedStock: null
			});
		}
	}

	handleSizeChange(size) {
		let products = this.props.product;
		products = products.map(product => {
			if (product.size === size || !product.size) {
				this.setState({
					selectedSize: size,
					selectedStock: product.stock
				});
			}
		});
	}

	render() {
		return !this.props.product ? (
			<span />
		) : (
			<div className="col-sm-10 product-info">
				<div className="row">
					<div className="col-6 product-image">
						<div className="row">
							<div className="col-12 product-image-display">
								<img
									src="http://www.chicago-soles.com/wp-content/uploads/London.jpg"
									className="img-fluid rounded mx-auto d-block"
									alt="Responsive image"
								/>
							</div>
							<div className="col-12 product-image-chooser text-center">
								<img
									src="http://via.placeholder.com/100x100"
									className="img-thumbnail rounded mx-auto"
									alt="Responsive"
								/>
								<img
									src="http://via.placeholder.com/100x100"
									className="img-thumbnail rounded mx-auto"
									alt="Responsive"
								/>
								<img
									src="http://via.placeholder.com/100x100"
									className="img-thumbnail rounded mx-auto"
									alt="Responsive"
								/>
							</div>
						</div>
					</div>
					<div className="col-6 product-details">
						<div className="col-12 text-center">
							<span className="product-title">
								{this.props.product[0].name}
							</span>
							<p className="product-price">{this.props.product[0].price}</p>
						</div>

						<ProductSizes
							products={this.props.product}
							handleChange={this.handleSizeChange.bind(this)}
						/>

						<ProductButton
							stock={this.state.selectedStock}
							size={this.state.selectedSize}
						/>

						<div className="col-12 product-section">
							<span className="product-bolded">PRODUCT DETAILS</span>
							<p className="product-description">
								{this.props.product[0].description}
							</p>
							<span className="product-designer">
								Designer: {this.props.product[0].designer}
							</span>
						</div>
						<div className="col-12 product-section">
							<span className="product-bolded">DELIVERY INFORMATION +</span>
						</div>
						<div className="col-12 product-section">
							<span className="product-bolded">SHIPPING & RETURNS +</span>
						</div>
						<div className="col-12 product-section">
							<span className="product-bolded">SHARE ON SOCIALS</span>
							<ul className="list-inline">
								<li className="list-inline-item footer-social-link">
									<i className="fa fa-facebook-official" aria-hidden="true" />
								</li>
								<li className="list-inline-item footer-social-link">
									<i className="fa fa-twitter" aria-hidden="true" />
								</li>
								<li className="list-inline-item footer-social-link">
									<i className="fa fa-instagram" aria-hidden="true" />
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		product: state.product
	};
}

export default connect(mapStateToProps, { fetchProduct })(ProductPage);
