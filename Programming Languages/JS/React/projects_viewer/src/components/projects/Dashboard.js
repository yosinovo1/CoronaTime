import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import ProjectMiniData from "./ProjectMiniData";
import ProjectNotFound from "../common/ProjectNotFound";

class Dashboard extends Component {

    render() {
        console.log(this.props.filteredProjects)
        return (
            <Fragment>
                <div style={{ "display": "flex", "flexWrap": "wrap", "alignItems": "left", "justifyContent": "center" }}>
                    {this.props.filteredProjects.length !== 0 ?
                        this.props.filteredProjects.map(projectData => <ProjectMiniData key={projectData.serialNumber} projectData={projectData} />)
                        : <ProjectNotFound />
                    }
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
    filteredProjects: state.projects.filteredProjects
});

export default connect(mapStateToProps)(Dashboard)
