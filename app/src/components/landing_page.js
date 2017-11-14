import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/landing.css';

class LandingPage extends Component {
	render() {
		return (
			<div class="container landing-container">
				<div class="row heading">
					<div class="col-4 landing-left">
						<div class="row landing-quarter">
							<div class="col-12 landing-logo">FASHON</div>
						</div>
						<div class="row landing-quarter">
							<div class="col-12 landing-header">
								<h1>Reginald Chudsley</h1>
							</div>
						</div>
						<div class="row landing-sixth">
							<div class="col-12 landing-desc">
								<span class="top-align">
									Fine fashions from the pits of despair. Plaid looks good on
									everybody. Memes are an inferior form of communication.
								</span>
							</div>
						</div>
						<div class="row landing-sixth">
							<div class="col-12 landing-more">
								<span class="top-align">- READ MORE -</span>
							</div>
						</div>
						<div class="row landing-sixth">
							<div class="col-12 landing-counter">
								<span class="carousel-number">1</span>{' '}
								<span class="carousel-number">2</span>{' '}
								<span class="carousel-number">3</span>{' '}
								<span class="carousel-number">4</span>{' '}
								<span class="carousel-number">5</span>
							</div>
						</div>
					</div>
					<div class="col-8 landing-right" />
				</div>
			</div>
		);
	}
}

export default LandingPage;
