import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProjectData from './ProjectData';

class Dashboard extends Component {
    static propTypes = {
        selectedProject: PropTypes.object
    }

    render() {
        return (
            <Fragment>
                <div style={{ "display": "flex", "flexWrap": "wrap", "alignItems": "left", "justifyContent": "center" }}>
                    {this.props.filteredProjects.map(projectData =>
                        <ProjectData key={projectData.serialNumber} projectData={projectData} />
                    )}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    filteredProjects: state.projects.filteredProjects
});

export default connect(mapStateToProps)(Dashboard)
