import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductPage extends Component {
	render() {
		return (
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
									alt="Responsive image"
								/>
								<img
									src="http://via.placeholder.com/100x100"
									className="img-thumbnail rounded mx-auto"
									alt="Responsive image"
								/>
								<img
									src="http://via.placeholder.com/100x100"
									className="img-thumbnail rounded mx-auto"
									alt="Responsive image"
								/>
							</div>
						</div>
					</div>
					<div className="col-6 product-details">
						<div className="col-12 text-center">
							<span className="product-title">VINTAGE BOOTS</span>
							<p className="product-price">$599</p>
						</div>
						<div className="col-12 text-center product-dropdowns">
							<div className="row">
								<div className="col-6">
									<select
										name="size"
										className="product-select product-size-select"
									>
										<option value="size" selected disabled>
											Size
										</option>
										<option value="8">8</option>
										<option value="8.5">8.5</option>
										<option value="9">9</option>
										<option value="9.5">9.5</option>
									</select>
								</div>
								<div className="col-6">
									<select
										name="qty"
										className="product-select product-qty-select"
									>
										<option value="qty" selected>
											Qty
										</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</div>
							</div>
						</div>
						<div className="col-12 product-section">
							<button className="btn btn-block button-add-to-bag">
								ADD TO BAG
							</button>
						</div>
						<div className="col-12 product-section">
							<span className="product-bolded">PRODUCT DETAILS</span>
							<p className="product-description">
								So since yesterday on Twitter I found these great pantsu. I hear
								they're super popular in Japan and now I'm selling them at a
								400% markup.
							</p>
							<span className="product-designer">Designer: Chud Truckley</span>
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

export default ProductPage;
