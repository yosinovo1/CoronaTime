import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import contentIdStackReducer from './contentIdStackReducer';

const allReducers = combineReducers({
    selectedCategory: categoryReducer,
    contentIdStack: contentIdStackReducer
})

export default allReducers;