import React, { Component } from 'react';

class LandingHeader extends Component {

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
