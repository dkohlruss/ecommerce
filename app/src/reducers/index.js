import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ProductsReducer from './reducer_products';
import ProductReducer from './reducer_product';
import cartReducer from './reducer_cart';
import loginReducer from './reducer_login';

const rootReducer = combineReducers({
	products: ProductsReducer,
	product: ProductReducer,
	cart: cartReducer,
	user: loginReducer,
	form: formReducer
});

export default rootReducer;
