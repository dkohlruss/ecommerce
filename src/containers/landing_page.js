import React, { Component } from 'react';
import { connect } from 'react-redux';

import LandingHeader from '../components/landing_header';
import LandingPhrase from '../components/landing_phrase';
import LandingMore from '../components/landing_more';
import LandingCounter from '../components/landing_counter';
import LandingImage from '../components/landing_image';

import { fetchRandomProduct } from '../actions';

import '../css/landing.css';

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentSlide: 0
		};
		this.names = [];
		this.products = [];
		this.phrases = [];
		this.images = [];
		this.carousel = '';

		this.startCarousel.bind(this);
	}

	componentWillMount() {
		this.props.fetchRandomProduct();
	}

	componentWillUnmount() {
		clearInterval(this.carousel);
	}

	componentWillReceiveProps(newProps) {
		if (newProps !== this.props) {
			this.slideNum = newProps.products.length;

			this.names = [];
			this.phrases = [];
			this.images = [];
			this.products = [];

			newProps.products.forEach(product => {
				this.names.push(product.designer);
				this.phrases.push(product.description);
				this.images.push(null);
				this.products.push(product.name);
			});

			this.startCarousel(5000);
		}
	}

	startCarousel(delay) {
		let slide = this.state.currentSlide;
		this.carousel = setInterval(() => {
			slide === this.names.length - 1 ? (slide = 0) : slide++;
			this.setState({ currentSlide: slide });
		}, delay);
	}

	changeCarousel(event) {
		let currentSlide = event.target.innerHTML - 1;
		clearInterval(this.carousel);
		this.setState({ currentSlide });
		this.startCarousel(5000);
	}

	render() {
		return (
			<div className="container landing-container">
				<div className="row heading">
					<div className="col-4 landing-left">
						<div className="row landing-quarter">
							<div className="col-12 landing-logo">FASHON</div>
						</div>

						<LandingHeader slide={this.state.currentSlide} names={this.names} />
						<LandingPhrase
							slide={this.state.currentSlide}
							phrases={this.phrases}
						/>
						<LandingMore
							slide={this.state.currentSlide}
							names={this.products}
						/>
						<LandingCounter
							slide={this.state.currentSlide}
							numbers={this.names}
							changeCarousel={this.changeCarousel.bind(this)}
						/>
					</div>
					<LandingImage slide={this.state.currentSlide} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

export default connect(mapStateToProps, { fetchRandomProduct })(LandingPage);
