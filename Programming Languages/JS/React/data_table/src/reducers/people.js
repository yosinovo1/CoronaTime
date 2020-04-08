import { GET_PEOPLE_DATA, SET_PEOPLE_DATA } from '../actions/types.js';

const initialState = {
    peopleData: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PEOPLE_DATA:
        case SET_PEOPLE_DATA:
            return {
                ...state,
                peopleData: action.payload
            }
        default:
            return state;
    }
}
