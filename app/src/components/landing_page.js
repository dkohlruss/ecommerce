import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/landing.css';

class LandingPage extends Component {
	render() {
		return (
			<div className="container landing-container">
				<div className="row heading">
					<div className="col-4 landing-left">
						<div className="row landing-quarter">
							<div className="col-12 landing-logo">FASHON</div>
						</div>
						<div className="row landing-quarter">
							<div className="col-12 landing-header">
								<h1>Reginald Chudsley</h1>
							</div>
						</div>
						<div className="row landing-sixth">
							<div className="col-12 landing-desc">
								<span className="top-align">
									Fine fashions from the pits of despair. Plaid looks good on
									everybody. Memes are an inferior form of communication.
								</span>
							</div>
						</div>
						<div className="row landing-sixth">
							<div className="col-12 landing-more">
								<span className="top-align">- READ MORE -</span>
							</div>
						</div>
						<div className="row landing-sixth">
							<div className="col-12 landing-counter">
								<span className="carousel-number">1</span>{' '}
								<span className="carousel-number">2</span>{' '}
								<span className="carousel-number">3</span>{' '}
								<span className="carousel-number">4</span>{' '}
								<span className="carousel-number">5</span>
							</div>
						</div>
					</div>
					<div className="col-8 landing-right" />
				</div>
			</div>
		);
	}
}

export default LandingPage;
