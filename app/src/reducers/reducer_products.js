export default function(state = null, action) {
	switch (action.type) {
		case 'FETCH_POSTS':
			return action.payload.data;
		case 'FETCH_CATEGORY':
			return action.payload.data;
		default:
			return state;
	}
}
