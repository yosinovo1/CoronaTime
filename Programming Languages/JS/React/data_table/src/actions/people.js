import { GET_PEOPLE_DATA, UPDATE_SELECTED_PROJECT, UPDATE_FILTERED_PROJECTS } from './types';

// GET PEOPLE DATA
export const getPeopleData = () => dispatch => {
    dispatch({
        type: GET_PEOPLE_DATA,
        payload: [
            { name: 'Yosi', surname: 'Novogroder', birthYear: 1999, birthCity: 1 },
            { name: 'Avi', surname: 'Cohen', birthYear: 2001, birthCity: 2 },
        ]
    })
}

// UPDATE FILTERED PROJECTS
export const updateFilteredProjects = (filteredProjects) => dispatch => {
    dispatch({
        type: UPDATE_FILTERED_PROJECTS,
        payload: filteredProjects
    });
}

// GET SELECTED PROJECT
export const updateSelectedProject = (selectedProject) => dispatch => {
    dispatch({
        type: UPDATE_SELECTED_PROJECT,
        payload: selectedProject
    });
}