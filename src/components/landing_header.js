import React, { Component } from 'react';

/*
	props:
		slide: The current slide index being displayed
		names: Array of names of each potential slide to be displayed
*/
class LandingHeader extends Component {
	// This exists in case the styles of the component are to be held as state
	// (unlikely to be needed again)
	componentWillReceiveProps(newProps) {
		if (newProps.slide !== this.props.slide) {
			this.setState({ styles: {} });
			setTimeout(() => {
				this.setState({ styles: this.styles });
			}, 3000);
		}
	}

	render() {
		return (
			<div className="row landing-quarter">
				<div className="col-12 landing-header">
					<h1>{this.props.names[this.props.slide]}</h1>
				</div>
			</div>
		);
	}
}

export default LandingHeader;
