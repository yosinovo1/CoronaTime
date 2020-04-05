import React, { Component, Fragment } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProjectData from './ProjectData';

class Dashboard extends Component {
    static propTypes = {
        selectedProject: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.showFields = ["serialNumber", "gush", "helka", "address", "customer", "created_by"];
    }

    presentBasicProject(projectData) {
        return (
            <Fragment>
                {projectData.helka} / {projectData.gush} :גוש / חלקה<br />
                כתובת: {projectData.address.street_name} {projectData.address.house_number}, {projectData.address.city}<br />
                לקוח: {projectData.customer.firstname} {projectData.customer.lastname}<br />
                מס' טלפון: {projectData.customer.phonenumber}<br />
            </Fragment>
        )
    }

    presentExtendedProject(projectData) {
        return (
            <Fragment>
                <Divider style={{"marginTop": "1rem", "marginBottom": "1rem"}} />
                {`${projectData.created_by.firstname} ${projectData.created_by.lastname}`} :נוצר על ידי<br />
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                <div style={{"display": "flex", "flexWrap": "wrap", "alignItems": "left", "justifyContent": "center"}}>
                    {this.props.filteredProjects.map(projectData =>
                        <ProjectData key={projectData.serialNumber} projectData={projectData}/>
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
