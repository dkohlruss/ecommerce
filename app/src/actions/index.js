import axios from 'axios';

export function fetchPosts() {
	const request = axios.get('http://localhost:3001/api/');

	return {
		type: 'FETCH_POSTS',
		payload: request
	};
}

export function fetchCategory(category) {
	const request = axios.get(`http://localhost:3001/api/${category}`);

	return {
		type: 'FETCH_CATEGORY',
		payload: request
	};
}
