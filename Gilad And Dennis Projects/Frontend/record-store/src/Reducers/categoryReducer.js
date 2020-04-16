import {SELECT_CATEGORY} from '../Actions';
import {categories} from '../configuration';

const categoryReducer = (state = categories.SONGS, action) => {
    switch(action.type){
        case SELECT_CATEGORY:
            return action.payload;
        default:
            return state
    }
    
}

export default categoryReducer;