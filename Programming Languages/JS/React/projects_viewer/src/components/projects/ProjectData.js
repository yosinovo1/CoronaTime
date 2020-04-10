import React, { Component, Fragment } from 'react';

import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


class ProjectData extends Component {

    constructor(props) {
        super(props);

        this.projectData = props.projectData;
        this.editableData = JSON.parse(JSON.stringify(this.projectData))
        this.state = {
            expandInfo: false,
            editInfo: false,
            saving: false
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
                {this.projectData.location.helka.join()} / {this.projectData.location.gush} :גוש / חלקה<br />
                {this.projectData.location.helka2 ? this.projectData.location.helka2.join() : null} / {this.projectData.location.gush2} :2גוש2 / חלקה<br />
                מגרש: {this.projectData.location.migrash}<br />
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

    presentEditableProject() {
        return (
            <form noValidate autoComplete="off">
                <div style={{"padding": "1rem"}}>
                    <Typography color="textPrimary">
                        גוש\חלקה
                    </Typography>
                    <div style={{"display": "flex", "flexDirection": "row-reverse"}}>
                    <TextField onChange={(e) => this.editableData.location.gush = e.target.value} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="גוש" defaultValue={this.projectData.location.gush} />
                        <TextField onChange={(e) => this.editableData.location.helka = (e.target.value).replace(/\s/g, '').split(",")} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="חלקה" defaultValue={this.projectData.location.helka} />
                        <TextField onChange={(e) => this.editableData.location.gush2 = e.target.value} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="2 גוש" defaultValue={this.projectData.location.gush2} />
                        <TextField onChange={(e) => this.editableData.location.helka2 = (e.target.value).replace(/\s/g, '').split(",")} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="2 חלקה" defaultValue={this.projectData.location.helka2} />
                    </div>
                </div>
                <Divider />
                <div style={{"padding": "1rem"}}>
                    <Typography color="textPrimary">
                        כתובת
                    </Typography>
                    <div style={{"display": "flex", "flexDirection": "row-reverse"}}>
                        <TextField onChange={(e) => this.editableData.address.city = e.target.value} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="עיר" defaultValue={this.projectData.address.city} />
                        <TextField onChange={(e) => this.editableData.address.street_name = e.target.value} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="רחוב" defaultValue={this.projectData.address.street_name} />
                        <TextField onChange={(e) => this.editableData.address.house_number = e.target.value} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="מס' בית" defaultValue={this.projectData.address.house_number} />
                    </div>
                </div>
                <Divider />
                <div style={{"padding": "1rem"}}>
                    <Typography color="textPrimary">
                        לקוח
                    </Typography>
                    <div style={{"display": "flex", "flexDirection": "row-reverse"}}>
                        <TextField onChange={(e) => this.editableData.customer.firstname = e.target.value} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="שם פרטי" defaultValue={this.projectData.customer.firstname} />
                        <TextField onChange={(e) => this.editableData.customer.lastname = e.target.value} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="שם משפחה" defaultValue={this.projectData.customer.lastname} />
                        <TextField onChange={(e) => this.editableData.customer.phonenumber = e.target.value} style={{"paddingLeft": "0.5rem", "Width": "50px"}} id="standard-basic" label="מס' פלאפון" defaultValue={this.projectData.customer.phonenumber} />
                    </div>
                </div>
            </form>
        )
    }

    handleCloseEdit(shouldSave) {
        if(shouldSave) {
            this.setState({ saving: true });
            this.projectData = JSON.parse(JSON.stringify(this.editableData));
        }
        this.editableData = JSON.parse(JSON.stringify(this.projectData));
        if(shouldSave) {
            new Promise(resolve => setTimeout(resolve, 1250)).then(() => {this.setState({ editInfo: false, saving: false })})
        }
        else {
            this.setState({ editInfo: false, saving: false })
        }
    }

    render() {
        return (
            <div style={{ "margin": "2rem", "display": "flex", "justifyContent": "center" }}>
                <Card variant="outlined" style={{ "width": "60vw", "textAlign": "right" }} >
                    <CardContent>
                        <Typography align="center" color="textPrimary" variant="h5" component="h1" gutterBottom>
                            {this.projectData.serialNumber}
                        </Typography>
                        <Card variant="outlined" style={{ "padding": "1rem" }}>
                            {this.state.saving ? <div style={{"display": "flex", "justifyContent": "center"}}><CircularProgress  /></div> : null}
                            <Typography color="textSecondary">
                                {!this.state.editInfo && !this.state.saving ? this.presentBasicProject() : null}
                                {this.state.editInfo ? this.presentEditableProject() : null}
                            </Typography>
                            <Collapse in={this.state.expandInfo} timeout="auto" unmountOnExit>
                                <Typography color="textSecondary">
                                    {this.presentExtendedProject()}
                                </Typography>
                            </Collapse>
                        </Card>
                    </CardContent>
                    <CardActions style={{"display": "flex", "justifyContent": "space-between"}}>
                        {!this.state.editInfo && !this.state.saving ? <Tooltip title={this.state.expandInfo ? "הצג פחות" : "הצג עוד" } aria-label="expand"><IconButton size="medium" onClick={() => this.setState({ expandInfo: !this.state.expandInfo })}>{this.state.expandInfo ? <ExpandLessIcon /> : <ExpandMoreIcon /> }</IconButton></Tooltip> : null}
                        {!this.state.editInfo && !this.state.saving ? <Tooltip title="ערוך" aria-label="edit"><IconButton size="medium" onClick={() => this.setState({ editInfo: !this.state.editInfo, expandInfo: false })}><EditIcon /></IconButton></Tooltip> : null}
                        {this.state.editInfo && !this.state.saving ? 
                            <Fragment>
                                <Tooltip title="שמור" aria-label="save"><IconButton onClick={() => this.handleCloseEdit(true)}><DoneIcon /></IconButton ></Tooltip>
                                <Tooltip title="בטל" aria-label="cancel"><IconButton onClick={() => this.handleCloseEdit(false)}><CloseIcon /></IconButton></Tooltip>
                            </Fragment>
                            :
                            null
                        }
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default ProjectData
