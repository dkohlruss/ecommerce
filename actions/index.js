import axios from 'axios';

axios.defaults.withCredentials = true;

export function fetchPosts() {
	const request = axios.get('http://ecommerceback.herokuapp.com/api/');

	return {
		type: 'FETCH_POSTS',
		payload: request
	};
}

export function fetchProduct(name) {
	const request = axios.get(
		`http://ecommerceback.herokuapp.com/api/product/${name}`
	);

	return {
		type: 'FETCH_PRODUCT',
		payload: request
	};
}

export function fetchRandomProduct() {
	const request = axios.get(`http://ecommerceback.herokuapp.com/api/random`);

	return {
		type: 'FETCH_RANDOM',
		payload: request
	};
}

export function addCart(product) {
	const request = axios.post(`http://ecommerceback.herokuapp.com/user/cart`, {
		product
	});

	return {
		type: 'ADD_CART',
		payload: request
	};
}

export function deleteCart(product) {
	const request = axios.delete(`http://ecommerceback.herokuapp.com/user/cart`, {
		data: product
	});

	return {
		type: 'DELETE_CART',
		payload: request
	};
}

export function fetchCart() {
	const request = axios.get(`http://ecommerceback.herokuapp.com/user/cart/`);

	return {
		type: 'FETCH_CART',
		payload: request
	};
}

export function fetchUser() {
	const request = axios.get(`http://ecommerceback.herokuapp.com/user`);

	return {
		type: 'FETCH_USER',
		payload: request
	};
}

export function userLogin(params) {
	const request = axios.post(
		`http://ecommerceback.herokuapp.com/user/login`,
		params
	);

	return {
		type: 'USER_LOGIN',
		payload: request
	};
}

export function userLogout() {
	const request = axios.post(`http://ecommerceback.herokuapp.com/user/logout`);

	return {
		type: 'USER_LOGOUT',
		payload: request
	};
}

export function userRegister(params) {
	const request = axios.post(
		`http://ecommerceback.herokuapp.com/user/register`,
		params
	);

	return {
		type: 'USER_REGISTER',
		payload: request
	};
}

export function submitEdit(values, callback) {
	const request = axios
		.post(`http://ecommerceback.herokuapp.com/api/products/edit`, values)
		.then(() => {
			callback();
		});

	return {
		type: 'EDIT_PRODUCT',
		payload: request
	};
}

export function submitNew(values, callback) {
	// if (values.size) {
	// 	values.size = values.size.split(',');
	// }
	//
	// values.stock = values.stock.split(',');
	//
	// if (!values.size || (values.size.length !== values.stock.length)) {
	//
	// }

	const request = axios
		.post(`http://ecommerceback.herokuapp.com/api/products/new`, values)
		.then(() => {
			callback();
		});

	return {
		type: 'EDIT_PRODUCT',
		payload: request
	};
}
