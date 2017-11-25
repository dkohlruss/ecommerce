import React, { Component } from 'react';

class LandingCounter extends Component {
	constructor(props) {
		super(props);

		console.log(this.props);
	}

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
				>
					{i}
				</span>
			);
		}

		return numbers;
	}

	render() {
		console.log('rendering');
		return (
			<div className="row landing-sixth">
				<div className="col-12 landing-counter">{this.getNumbers()}</div>
			</div>
		);
	}
}

export default LandingCounter;
