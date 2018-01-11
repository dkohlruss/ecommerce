import React, { Component } from 'react';

/*
	props:
		phrases: Array of description phrases assigned to each individual slideNum
		slide: The index of the current slide being displayed
*/
class LandingPhrase extends Component {
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
