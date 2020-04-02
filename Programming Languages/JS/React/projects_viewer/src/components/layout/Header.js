import React, { Component, Fragment } from 'react';

import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects, updateSelectedProject, updateFilteredProjects } from '../../actions/projects';

class Header extends Component {
    static propTypes = {
        projects: PropTypes.array.isRequired,
        selectedProject: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.props.getProjects();
        this.searchFields = ["serialNumber", "gush", "helka", "address", "customer"];
    }

    filterProjects(inputValue) {
        let filteredProjects = this.props.projects.filter(projectData => this.searchFieldsInProject(projectData, this.searchFields, inputValue));
        this.props.updateFilteredProjects(filteredProjects);
    }

    searchFieldsInProject(projectData, searchFields, inputValue) {
        let shouldAdd = false;

        searchFields.forEach(field => {
            if (!shouldAdd) {
                if (typeof projectData[field] === "object") {
                    // Search in all keys
                    shouldAdd = this.searchFieldsInProject(projectData[field], Object.keys(projectData[field]), inputValue)
                }

                else if (projectData[field].toString().toLowerCase().includes(inputValue.toLowerCase())) {
                    shouldAdd = true;
                }
            }
        });
        return shouldAdd;
    }


    render() {
        return (
            <div style={{ "backgroundColor": "rgba(255, 255, 255, 0.08)", "padding": "1em" }}>
                <a href="#" style={{ "color": "white", textDecoration: "none" }}><h1 style={{ "margin": 0 }}>פרוייקטים</h1></a>
                <TextField
                    label="חפש פרוייקט"
                    onChange={(e) => this.filterProjects(e.target.value)}
                    autoFocus
                    inputProps={{
                        style: { textAlign: "right", width: 400 }
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject
});

export default connect(mapStateToProps, { getProjects, updateSelectedProject, updateFilteredProjects })(Header);
