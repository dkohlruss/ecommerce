import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductsPage extends Component {
	render() {
		return (
			<div className="col-10 product-mosaic">
				<div className="row">
					<div className="col-12 text-center">
						<h2>Some Items</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-md-6 text-center">
						<img src="http://via.placeholder.com/200x200" />
						<br />
						Item 1
					</div>
					<div className="col-lg-4 col-md-6  text-center">
						<img src="http://via.placeholder.com/200x200" />
						<br />
						Item 1
					</div>
					<div className="col-lg-4 col-md-6  text-center">
						<img src="http://via.placeholder.com/200x200" />
						<br />
						Item 1
					</div>

					<div className="col-lg-4 col-md-6  text-center">
						<img src="http://via.placeholder.com/200x200" />
						<br />
						Item 1
					</div>
					<div className="col-lg-4 col-md-6 text-center">
						<img src="http://via.placeholder.com/200x200" />
						<br />
						Item 1
					</div>
					<div className="col-lg-4 col-md-6 text-center">
						<img src="http://via.placeholder.com/200x200" />
						<br />
						Item 1
					</div>
				</div>
			</div>
		);
	}
}

export default ProductsPage;
