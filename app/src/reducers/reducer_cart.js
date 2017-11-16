export default function(state = [], action) {
	switch (action.type) {
		case 'FETCH_CART':
			return action.payload.data;
		case 'ADD_CART':
			return action.payload;
		default:
			return state;
	}
}
