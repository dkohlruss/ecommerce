import React, { Component } from 'react';

class LandingPhrase extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row landing-sixth">
				<div className="col-12 landing-desc">
					<span className="top-align">
						{this.props.phrases[this.props.slide]}
					</span>
				</div>
			</div>
		);
	}
}

export default LandingPhrase;
