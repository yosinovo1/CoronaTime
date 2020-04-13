import { SET_DRAWER_OPEN_STATE } from './types';

// SET DRAWER OPEN STATE
export const setDrawerOpenState = (isOpen) => dispatch => {
    dispatch({
        type: SET_DRAWER_OPEN_STATE,
        payload: isOpen
    })
}
