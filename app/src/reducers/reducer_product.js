export default function(state = null, action) {
	switch (action.type) {
		case 'FETCH_PRODUCT':
			return action.payload.data[0];
		default:
			return state;
	}
}
