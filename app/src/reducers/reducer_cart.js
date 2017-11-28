export default function(state = [], action) {
	switch (action.type) {
		case 'FETCH_CART':
			return action.payload.data;
		case 'USER_LOGIN':
			return action.payload;
		case 'USER_LOGOUT':
			return action.payload.data;
		case 'ADD_CART':
			return action.payload.data;
		case 'DELETE_CART':
			return action.payload.data;
		default:
			return state;
	}
}
