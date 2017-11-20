import axios from 'axios';

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

export function fetchCartDetail() {
	const request = axios.get(`http://localhost:3001/user/cartDetail`);

	return {
		type: 'FETCH_CART_DETAIL',
		payload: request
	};
}
