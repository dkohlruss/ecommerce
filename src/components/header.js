import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CartPreview from '../containers/header_cart_preview';
import HeaderLogins from '../containers/header_login_links';

import '../css/interior.css';

/*
	Header, displaying login links and a preview of user cart
*/
class Header extends Component {
	render() {
		return (
			<div>
				<header className="container-fluid">
					<div className="container">
						<div className="row header-top">
							<div className="col-12 text-right">
								<HeaderLogins />
								<CartPreview />
							</div>
							<div className="col-12 text-center">
								<Link to={'/ecommerce/'}>
									<span className="title-name">FASHON</span>
								</Link>
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
											<Link to={'/ecommerce/main/products'}>ALL PRODUCTS</Link>
										</li>
										<li className="list-inline-item nav-item" id="accessories">
											<Link to={'/ecommerce/main/products/accessories'}>
												ACCESSORIES
											</Link>
										</li>
										<li className="list-inline-item nav-item" id="tops">
											<Link to={'/ecommerce/main/products/tops'}>TOPS</Link>
										</li>
										<li className="list-inline-item nav-item" id="bottoms">
											<Link to={'/ecommerce/main/products/bottoms'}>
												BOTTOMS
											</Link>
										</li>
										<li className="list-inline-item nav-item" id="boots">
											<Link to={'/ecommerce/main/products/boots'}>BOOTS</Link>
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
