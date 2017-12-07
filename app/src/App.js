import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
// import reducers from './reducers';

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

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {
	render() {
		return (
			// <Provider /*store={createStoreWithMiddleware(reducers)}*/>
			<Router>
				<div>
					<Route path="/" component={Header} />
					<div className="container">
						<div className="row">
							<Route
								exact
								path="/admin/new/newProduct"
								component={AdminProductNew}
							/>
							<Route exact path="/admin/:page" component={AdminProduct} />
							<Route exact path="/admin" component={AdminPage} />

							<Route path="/main" component={Sidebar} />
							<Route exact path="/main/cart" component={CartPage} />
							<Route exact path="/main" component={ProductsPage} />
							<Route exact path="/main/products" component={ProductsPage} />
							<Route
								exact
								path="/main/products/:category"
								component={ProductsPage}
							/>
							<Route
								exact
								path="/main/products/product/:productName"
								component={ProductPage}
							/>
						</div>
					</div>
					<Route exact path="/" component={LandingPage} />
					<Route path="/" component={Footer} />
				</div>
			</Router>
			// </Provider>
		);
	}
}

export default App;
