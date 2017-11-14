import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/interior.css';

class Footer extends Component {
	render() {
		return (
			<footer className="container-fluid">
				<div className="container">
					<div className="row">
						<div className="col-4">
							<div className="row">
								<div className="col-6 footer-col">
									<span className="footer-title">CUSTOMER SERVICE</span>
									<ul className="list-unstyled footer-links">
										<li>ABOUT & CONTACT</li>
										<li>CUSTOMER SERVICE</li>
										<li>TERMS & CONDITIONS</li>
										<li>ABOUT & CONTACT</li>
									</ul>
									<span className="footer-title">FASHON COPYRIGHT 2017</span>
								</div>
							</div>
						</div>
						<div className="col-4">
							<div className="row">
								<div className="col-6 footer-col">
									<span className="footer-title">NEWSLETTER</span>
									<p className="newsletter-blurb">
										RECEIVE SPECIAL OFFERS AND BE THE FIRST TO KNOW WHEN NEW
										PRODUCTS ARE RELEASED
									</p>

									<div className="input-group">
										<input
											type="text"
											className="input-email"
											placeholder="Email"
										/>
										<span className="input-group-btn">
											<button className="btn button-email" type="button">
												X
											</button>
											<button className="btn button-email" type="button">
												&#10003;
											</button>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-4">
							<div className="row">
								<div className="col-6 footer-col">
									<span className="footer-title">CONNECT</span>
									<ul className="list-inline footer-links">
										<li className="list-inline-item footer-social-link">
											<i
												className="fa fa-facebook-official"
												aria-hidden="true"
											/>
										</li>
										<li className="list-inline-item footer-social-link">
											<i className="fa fa-twitter" aria-hidden="true" />
										</li>
										<li className="list-inline-item footer-social-link">
											<i className="fa fa-instagram" aria-hidden="true" />
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
