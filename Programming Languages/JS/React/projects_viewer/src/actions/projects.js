import { GET_PROJECTS, UPDATE_SELECTED_PROJECT, UPDATE_FILTERED_PROJECTS } from './types';

// GET PROJECTS
export const getProjects = () => dispatch => {
    dispatch({
        type: GET_PROJECTS,
        payload: [
            {
                "_id": 1,
                "serialNumber": "2019-43",
                "creation_timestamp": "2019-06-25 08:43:21 +03:00",
                "created_by": {
                    "_id": 11,
                    "username": "best_username",
                    "firstname": "gilad",
                    "lastname": "leifman",
                    "password": "****",
                    "is_admin": false,
                    "saved_searches": [
                        {
                            "user_query": "BORDERS",
                            "db_query": "db.projects.find({'timing.state': 'BORDERS'});"
                        }
                    ]
                },
                "customer": {
                    "firstname": "אייל",
                    "lastname": "מגן",
                    "phonenumber": "0541234567"
                },
                "gush": 6948,
                "helka": "80",
                "address": {
                    "city": "פתח תקווה",
                    "street_name": "קפלנסקי",
                    "house_number": 41,
                },
                "timing": [
                    {
                        "user_id": 123123123,
                        "timestamp": "2019-06-26 08:00:00 +03:00",
                        "state": "IN_PROGRESS",
                    },
                    {
                        "user_id": 123123123,
                        "timestamp": "2019-06-26 09:00:00 +03:00",
                        "state": "PAUSE",
                        "manual_edit": [
                            {
                                "user_id": 123123123,
                                "timestamp": "2019-06-26 08:55:00 +03:00",
                            }
                        ]
                    }
                ]
            },
            {
                "_id": 2,
                "serialNumber": "2017-128",
                "creation_timestamp": "2017-06-25 08:43:21 +03:00",
                "created_by": {
                    "_id": 11,
                    "username": "best_username",
                    "firstname": "gilad",
                    "lastname": "leifman",
                    "password": "****",
                    "is_admin": false,
                    "saved_searches": [
                        {
                            "user_query": "BORDERS",
                            "db_query": "db.projects.find({'timing.state': 'BORDERS'});"
                        }
                    ]
                },
                "customer": {
                    "firstname": "סנטה",
                    "lastname": "קלאוס",
                    "phonenumber": "0500001000"
                },
                "gush": 4892,
                "helka": "3a",
                "address": {
                    "city": "תל אביב",
                    "street_name": "הברווז",
                    "house_number": 1,
                },
                "timing": [
                    {
                        "user_id": 11,
                        "timestamp": "2017-05-26 08:00:00 +03:00",
                        "state": "STARTED",
                    },
                    {
                        "user_id": 11,
                        "timestamp": "2017-06-26 08:00:00 +03:00",
                        "state": "DONE",
                    },
                ]
            },
            {
                "_id": 3,
                "serialNumber": "L1230",
                "creation_timestamp": "2010-06-25 08:43:21 +03:00",
                "created_by": {
                    "_id": 12,
                    "username": "best_username2",
                    "firstname": "yossi",
                    "lastname": "nov",
                    "password": "****",
                    "is_admin": false,
                    "saved_searches": [
                        {
                            "user_query": "BORDERS",
                            "db_query": "db.projects.find({'timing.state': 'BORDERS'});"
                        }
                    ]
                },
                "customer": {
                    "firstname": "סנטה",
                    "lastname": "קלאוס",
                    "phonenumber": "0500001000"
                },
                "gush": 7382,
                "helka": "122",
                "address": {
                    "city": "חדרה",
                    "street_name": "האתרוג",
                    "house_number": 2,
                },
                "timing": [
                    {
                        "user_id": 12,
                        "timestamp": "2010-05-26 08:00:00 +03:00",
                        "state": "STARTED",
                    },
                    {
                        "user_id": 12,
                        "timestamp": "2010-06-26 08:00:00 +03:00",
                        "state": "DONE",
                    },
                ]
            },
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