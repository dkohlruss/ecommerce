import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingMore extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		if (this.props.names) {
			return (
				<div className="row landing-sixth">
					<div className="col-12 landing-more">
						<span className="top-align">
							<Link
								to={`/products/product/${this.props.names[this.props.slide]}`}
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
