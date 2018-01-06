import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCart, fetchProduct } from '../actions';

import ProductSizes from '../components/product_sizes';
import ProductButton from '../components/product_button';

class ProductPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSize: null,
			selectedStock: null
		};

		let { productName } = this.props.match.params;
		this.props.fetchProduct(productName);
	}

	// componentWillMount() {
	// 	let { productName } = this.props.match.params;
	// 	this.props.fetchProduct(productName);
	// }

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

	addCart(product) {
		this.props.addCart(product);
	}

	handleSizeChange(size) {
		let sizes = this.props.product.size;
		for (let i = 0; i < sizes.length; i++) {
			if (size === sizes[i] || !sizes[1]) {
				this.setState({
					selectedSize: size,
					selectedStock: this.props.product.stock[i]
				});
			}
		}
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
									className="img-fluid rounded mx-auto d-block"
									src={this.props.product.images[0]}
									width="320"
									height="400"
									alt="Placeholder"
								/>
							</div>
							<div className="col-12-sm product-image-chooser text-center">
								<img
									src={this.props.product.images[1]}
									height="100"
									width="100"
									className="img-thumbnail rounded mx-auto"
									alt="Responsive"
								/>
								<img
									src={this.props.product.images[2]}
									height="100"
									width="100"
									className="img-thumbnail rounded mx-auto"
									alt="Responsive"
								/>
								<img
									src={this.props.product.images[3]}
									height="100"
									width="100"
									className="img-thumbnail rounded mx-auto"
									alt="Responsive"
								/>
							</div>
						</div>
					</div>

					<div className="col-6 product-details">
						<div className="col-12 text-center">
							<span className="product-title">{this.props.product.name}</span>
							<p className="product-price">{this.props.product.price}</p>
						</div>

						<ProductSizes
							products={this.props.product}
							handleChange={this.handleSizeChange.bind(this)}
						/>

						<ProductButton
							addCart={this.addCart.bind(this)}
							product={this.props.product}
							stock={this.state.selectedStock}
							size={this.state.selectedSize}
						/>

						<div className="col-12 product-section">
							<span className="product-bolded">PRODUCT DETAILS</span>
							<p className="product-description">
								{this.props.product.description}
							</p>
							<span className="product-designer">
								Designer: {this.props.product.designer}
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

export default connect(mapStateToProps, { addCart, fetchProduct })(ProductPage);
