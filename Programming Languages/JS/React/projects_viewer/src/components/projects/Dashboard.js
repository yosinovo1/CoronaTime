import React, { Component, Fragment } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects, updateSelectedProject } from '../../actions/projects';

class Dashboard extends Component {
    static propTypes = {
        selectedProject: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.showFields = ["serialNumber", "gush", "helka", "address", "customer", "created_by"];
    }

    presentProject(projectData) {
        return (
            <Fragment>
                {projectData.helka} / {projectData.gush} :גוש / חלקה<br />
                כתובת: {projectData.address.street_name} {projectData.address.house_number}, {projectData.address.city}<br />
                לקוח: {projectData.customer.firstname} {projectData.customer.lastname}<br />
                מס' טלפון: {projectData.customer.phonenumber}<br />
            </Fragment>
        )
    }

    showMore(projectSerial) {
        alert(`Show more about ${projectSerial}`)
    }

    render() {
        return (
            <div style={{"display": "flex", "flexWrap": "wrap", "alignItems": "left", "justifyContent": "center"}}>
            {this.props.filteredProjects.map(projectData =>
                <div style={{ "margin": "2rem", "display": "flex", "justifyContent": "center"}}>
                    <Card variant="outlined" style={{ "minWidth":"250px", "maxWidth":"350px", "width": "30vw", "textAlign": "right" }} >
                        <CardContent>
                            <Typography align="center" color="textPrimary" variant="h5" component="h1" gutterBottom>
                                {projectData.serialNumber}
                            </Typography>
                            <Typography variant="h5" component="h2">
                            </Typography>
                            <Card variant="outlined" style={{"padding": "1rem"}}>
                                <Typography color="textSecondary">
                                    {this.presentProject(projectData)}
                                </Typography>
                            </Card>
                        </CardContent>
                        <CardActions>
                            <Button size="medium" onClick={() => this.showMore(projectData.serialNumber)}>הצג עוד</Button>
                        </CardActions>
                    </Card>
                </div>
            )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects.projects,
    selectedProject: state.projects.selectedProject,
    filteredProjects: state.projects.filteredProjects
});

export default connect(mapStateToProps)(Dashboard)
