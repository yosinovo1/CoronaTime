import { SET_DRAWER_OPEN_STATE } from '../actions/types.js';

const initialState = {
    isDrawerOpen: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_DRAWER_OPEN_STATE:
            return {
                ...state,
                isDrawerOpen: action.payload
            }
        default:
            return state;
    }
}
