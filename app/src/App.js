import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
//import reducers from './reducers';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

import LandingPage from './components/landing_page';
import ProductPage from './components/product_page';
import ProductsPage from './components/products_page';
import AdminPage from './components/admin_page';
import CartPage from './components/cart_page';

import './App.css';

//const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {
	render() {
		return (
			//<Provider /*store={createStoreWithMiddleware(reducers)}*/>
			<Router>
				<div>
					<Route path="/" component={Header} />
					<Route path="/main" component={Sidebar} />
					<Route exact path="/main/admin" component={AdminPage} />
					<Route exact path="/main/cart" component={CartPage} />
					<Route exact path="/main" component={ProductsPage} />
					<Route exact path="/main/products" component={ProductsPage} />
					<Route
						exact
						path="/main/products/:productName"
						component={ProductPage}
					/>
					<Route exact path="/" component={LandingPage} />
					<Route path="/" component={Footer} />
				</div>
			</Router>
			//</Provider>
		);
	}
}

export default App;
