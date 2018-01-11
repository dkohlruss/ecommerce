import React, { Component } from 'react';

/*
	props:
		numbers: Array containing names of each slide
		slide: The current slide number
		changeCarousel: Function which will change the active slide being displayed to user
*/
class LandingCounter extends Component {
	// Returns an array of spans containing numbers 1, 2, 3, etc depending on length of this.props.numbers
	getNumbers() {
		let numbers = [];
		for (let i = 1; i < this.props.numbers.length + 1; i++) {
			numbers.push(
				<span
					className={
						'carousel-number ' +
						(this.props.slide + 1 === i ? 'active-num' : '')
					}
					key={i}
					onClick={this.props.changeCarousel}
				>
					{i}
				</span>
			);
		}

		return numbers;
	}

	render() {
		return (
			<div className="row landing-sixth">
				<div className="col-12 landing-counter">{this.getNumbers()}</div>
			</div>
		);
	}
}

export default LandingCounter;
