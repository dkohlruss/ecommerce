import axios from 'axios';

axios.defaults.withCredentials = true;

export function fetchPosts() {
	const request = axios.get('http://localhost:3001/api/');

	return {
		type: 'FETCH_POSTS',
		payload: request
	};
}

export function fetchProduct(name) {
	const request = axios.get(`http://localhost:3001/api/product/${name}`);

	return {
		type: 'FETCH_PRODUCT',
		payload: request
	};
}

export function addCart(product) {
	const request = axios.post(`http://localhost:3001/user/cart`, { product });

	return {
		type: 'ADD_CART',
		payload: request
	};
}

export function fetchCart() {
	const request = axios.get(`http://localhost:3001/user/cart/`);

	return {
		type: 'FETCH_CART',
		payload: request
	};
}

export function fetchUser() {
	const request = axios.get(`http://localhost:3001/user`);

	return {
		type: 'FETCH_USER',
		payload: request
	};
}

export function userLogin(params) {
	const request = axios.post(`http://localhost:3001/user/login`, params);

	return {
		type: 'USER_LOGIN',
		payload: request
	};
}

export function userLogout() {
	const request = axios.post(`http://localhost:3001/user/logout`);

	return {
		type: 'USER_LOGOUT',
		payload: request
	};
}

export function userRegister(params) {
	const request = axios.post(`http://localhost:3001/user/register`, params);

	return {
		type: 'USER_REGISTER',
		payload: request
	};
}
