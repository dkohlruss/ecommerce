export default function(state = {}, action) {
	switch (action.type) {
		case 'USER_LOGIN':
			return action.payload;
		case 'USER_REGISTER':
			return action.payload;
		case 'USER_LOGOUT':
			return action.payload;
		default:
			return state;
	}
}
