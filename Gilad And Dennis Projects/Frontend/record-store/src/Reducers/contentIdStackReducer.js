import {SELECT_CATEGORY} from '../Actions';
import {categories} from '../configuration';

const INITAL_STATE = {
    category: categories.SONGS,
    value: null,
    searchString: null
}

const contentIdStackReducer = (state=[INITAL_STATE], action) => {
    switch(action.type) {
        case SELECT_CATEGORY:
            return [{
                category: action.payload,
                value: null,
                searchString: null
            }];
        default:
            return state;
    }
}

export default contentIdStackReducer;