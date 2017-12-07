import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './containers/sidebar';
import CartPage from './containers/cart_page';
import AdminPage from './containers/admin_page';
import LandingPage from './containers/landing_page';
import ProductPage from './containers/product_page';
import ProductsPage from './containers/products_page';

import AdminProduct from './containers/admin_product';
import AdminProductNew from './containers/admin_product_new';

import './css/index.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route path="/ecommerce" component={Header} />
					<div className="container">
						<div className="row">
							<Route
								exact
								path="/ecommerce/admin/new/newProduct"
								component={AdminProductNew}
							/>
							<Route
								exact
								path="/ecommerce/admin/:page"
								component={AdminProduct}
							/>
							<Route exact path="/ecommerce/admin" component={AdminPage} />

							<Route path="/ecommerce/main" component={Sidebar} />
							<Route exact path="/ecommerce/main/cart" component={CartPage} />
							<Route exact path="/ecommerce/main" component={ProductsPage} />
							<Route
								exact
								path="/ecommerce/main/products"
								component={ProductsPage}
							/>
							<Route
								exact
								path="/ecommerce/main/products/:category"
								component={ProductsPage}
							/>
							<Route
								exact
								path="/ecommerce/main/products/product/:productName"
								component={ProductPage}
							/>
						</div>
					</div>
					<Route exact path="/ecommerce/" component={LandingPage} />
					<Route path="/ecommerce/" component={Footer} />
				</div>
			</Router>
		);
	}
}

export default App;
