import { GET_PROJECTS, UPDATE_SELECTED_PROJECT, UPDATE_FILTERED_PROJECTS } from '../actions/types.js';

const initialState = {
    projects: [],
    filteredProjects: [],
    selectedProject: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                filteredProjects: action.payload
            }
        case UPDATE_SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: action.payload
            }
        case UPDATE_FILTERED_PROJECTS:
            return {
                ...state,
                filteredProjects: action.payload
            }
        default:
            return state;
    }
}
