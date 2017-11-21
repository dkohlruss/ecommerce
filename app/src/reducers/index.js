import { combineReducers } from 'redux';
import ProductsReducer from './reducer_products';
import ProductReducer from './reducer_product';
import cartReducer from './reducer_cart';
import loginReducer from './reducer_login';

const rootReducer = combineReducers({
	products: ProductsReducer,
	product: ProductReducer,
	cart: cartReducer,
	user: loginReducer
});

export default rootReducer;
