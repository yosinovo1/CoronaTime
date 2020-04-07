import { GET_PEOPLE_DATA, SET_PEOPLE_DATA } from './types';

// GET PEOPLE DATA
export const getPeopleData = () => dispatch => {
    let peopleData = [
        { name: 'Yosi', surname: 'Novogroder', birthYear: 1999, birthCity: 1 },
        { name: 'Avi', surname: 'Cohen', birthYear: 2001, birthCity: 2 },
    ]
    dispatch({
        type: GET_PEOPLE_DATA,
        payload: peopleData
    })
}

// SET PEOPLE DATA
export const setPeopleData = (peopleData) => dispatch => {
    dispatch({
        type: SET_PEOPLE_DATA,
        payload: peopleData
    })
}
