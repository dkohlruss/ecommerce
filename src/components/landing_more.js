import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
	props:
		names: Array of names of each product
		slide: The current slide being displayed
*/
class LandingMore extends Component {
	render() {
		if (this.props.names) {
			return (
				<div className="row landing-sixth">
					<div className="col-12 landing-more">
						<span className="top-align">
							<Link
								to={`/ecommerce/main/products/product/${
									this.props.names[this.props.slide]
								}`}
							>
								- READ MORE -
							</Link>
						</span>
					</div>
				</div>
			);
		}
		return null;
	}
}

export default LandingMore;
