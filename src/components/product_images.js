import React, { Component } from 'react';

class PhotoChooser extends Component {
	constructor(props) {
		super(props);

		this.state = { displayedImage: '' };
		this.chooseImage.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.images.indexOf(this.state.displayedImage) < 0) {
			this.setState({ displayedImage: newProps.images[0] });
		}
	}

	chooseImage(newImage) {
		this.setState({ displayedImage: newImage });
	}

	render() {
		return !this.props.images ? (
			<div />
		) : (
			<div className="row">
				<div className="col-12 product-image-display">
					<img
						className="img-fluid rounded mx-auto d-block"
						src={this.state.displayedImage}
						width="320"
						height="400"
						alt="Placeholder"
					/>
				</div>
				<div className="col-12-sm product-image-chooser text-center">
					<img
						src={this.props.images[0]}
						onClick={() => this.chooseImage(this.props.images[0])}
						height="100"
						width="100"
						className="img-thumbnail rounded mx-auto"
						alt="Responsive"
					/>
					<img
						src={this.props.images[1]}
						onClick={() => this.chooseImage(this.props.images[1])}
						height="100"
						width="100"
						className="img-thumbnail rounded mx-auto"
						alt="Responsive"
					/>
					<img
						src={this.props.images[2]}
						onClick={() => this.chooseImage(this.props.images[2])}
						height="100"
						width="100"
						className="img-thumbnail rounded mx-auto"
						alt="Responsive"
					/>
				</div>
			</div>
		);
	}
}

export default PhotoChooser;
