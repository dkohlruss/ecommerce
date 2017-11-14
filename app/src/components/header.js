import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/interior.css';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	login() {
		console.log('log in clicked!');
	}

	render() {
		return (
			<div>
				<header className="container-fluid">
					<div className="container">
						<div className="row header-top">
							<div className="col-12 text-right">
								<span className="header-account-text" onClick={this.login}>
									LOGIN
								</span>
								<span className="header-account-text">CHECKOUT</span>
							</div>
							<div className="col-12 text-center">
								<span className="title-name">FASHON</span>
							</div>
						</div>
					</div>
				</header>
				<nav className="container-fluid">
					<div className="container">
						<div className="row">
							<div className="col-12 header-bottom">
								<div className="nav-div">
									<ul className="list-inline d-flex justify-content-center nav-list">
										<li className="list-inline-item nav-item">
											<Link to={'/main/products'}>HOME</Link>
										</li>
										<li className="list-inline-item nav-item" id="accessories">
											<Link to={'/main/products/think'}>ACCESSORIES</Link>
										</li>
										<li className="list-inline-item nav-item" id="tops">
											<Link to={'/main/products'}>TOPS</Link>
										</li>
										<li className="list-inline-item nav-item" id="bottoms">
											<Link to={'/main/products'}>BOTTOMS</Link>
										</li>
										<li className="list-inline-item nav-item" id="boots">
											<Link to={'/main/products'}>BOOTS</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

export default Header;
