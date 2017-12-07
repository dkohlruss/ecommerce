export default function(state = null, action) {
	switch (action.type) {
		case 'FETCH_USER':
			return action.payload.data;
		case 'USER_LOGIN':
			return action.payload;
		case 'USER_REGISTER': {
			console.log(action.payload);
			return action.payload.data;
		}
		case 'USER_LOGOUT':
			return null;
		default:
			return state;
	}
}
