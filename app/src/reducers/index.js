import { combineReducers } from 'redux';
import ProductsReducer from './reducer_products';
import ProductReducer from './reducer_product';
import cartReducer from './reducer_cart';

const rootReducer = combineReducers({
	products: ProductsReducer,
	product: ProductReducer,
	cart: cartReducer
});

export default rootReducer;
