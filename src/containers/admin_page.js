import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchUser } from '../actions';

/*
	props from redux:
		user: User data object
		products: Products data object
*/
class AdminPage extends Component {
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
				<ul className="list-unstyled admin-list" key={category}>
					{category}
					{navObject[category].map(product => {
						return (
							<li className="admin-list-entries" key={product}>
								<Link to={`/ecommerce/admin/${product}`}>{product}</Link>
							</li>
						);
					})}
				</ul>
			);
		});
	}

	// Renders the view only if products & user data is loaded and user level is 1 (admin)
	render() {
		return (
			<div>
				{this.props.products &&
				this.props.user &&
				this.props.user.data.user.level === 1 ? (
					<div className="col-10 cart-container">
						<h2 className="text-center">Administration</h2>
						<div className="row">
							<div className="col-12">{this.renderNav()}</div>
						</div>
						<div className="row">
							<div className="col-lg-2">
								<Link to={`/ecommerce/admin/new/newProduct`}>
									<button className="btn btn-block button-add-to-bag">
										New Product
									</button>
								</Link>
							</div>
						</div>
					</div>
				) : (
					<span>You do not have access to this area.</span>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
		user: state.user
	};
}

export default connect(mapStateToProps, { fetchPosts, fetchUser })(AdminPage);
