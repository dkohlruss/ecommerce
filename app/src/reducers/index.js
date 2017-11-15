import { combineReducers } from 'redux';
import ProductsReducer from './reducer_products';
import ProductReducer from './reducer_product';

const rootReducer = combineReducers({
	products: ProductsReducer,
	product: ProductReducer
});

export default rootReducer;
