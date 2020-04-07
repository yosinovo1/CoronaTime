import React, { Component, Fragment } from 'react';

import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class ProjectData extends Component {

    constructor(props) {
        super(props);

        this.projectData = props.projectData;
        this.state = {
            expandInfo: false
        }
    }

    presentProjectIdentifier() {
        return (
            this.projectData.serialNumber
        )
    }

    presentBasicProject() {
        return (
            <Fragment>
                {this.projectData.helka} / {this.projectData.gush} :גוש / חלקה<br />
                כתובת: {this.projectData.address.street_name} {this.projectData.address.house_number}, {this.projectData.address.city}<br />
                לקוח: {this.projectData.customer.firstname} {this.projectData.customer.lastname}<br />
                מס' טלפון: {this.projectData.customer.phonenumber}<br />
            </Fragment>
        )
    }

    presentExtendedProject() {
        return (
            <Fragment>
                <Divider style={{ "marginTop": "1rem", "marginBottom": "1rem" }} />
                {this.projectData.creation_timestamp.slice(0, 16)} בתאריך {`${this.projectData.created_by.firstname} ${this.projectData.created_by.lastname}`} נוצר על ידי
            </Fragment>
        )
    }

    render() {
        return (
            <div style={{ "margin": "2rem", "display": "flex", "justifyContent": "center" }}>
                <Card variant="outlined" style={{ "width": "60vw", "textAlign": "right" }} >
                    <CardContent>
                        <Typography align="center" color="textPrimary" variant="h5" component="h1" gutterBottom>
                            {this.projectData.serialNumber}
                        </Typography>
                        <Typography variant="h5" component="h2">
                        </Typography>
                        <Card variant="outlined" style={{ "padding": "1rem" }}>
                            <Typography color="textSecondary">
                                {this.presentBasicProject()}
                            </Typography>
                            <Collapse in={this.state.expandInfo} timeout="auto" unmountOnExit>
                                {this.presentExtendedProject()}
                            </Collapse>
                        </Card>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" onClick={() => this.setState({ expandInfo: !this.state.expandInfo })}>{this.state.expandInfo ? "הצג פחות" : "הצג עוד" }</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default ProjectData
