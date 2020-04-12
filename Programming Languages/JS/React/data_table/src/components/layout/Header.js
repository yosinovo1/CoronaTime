import React from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/Contacts';
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 240;
const headerHeight = 56;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#202020",
        boxShadow: "none",
        height: headerHeight
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#202020",
        border: "none"
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default function Header() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    let hrefElements = window.location.href.split("/");
    const [selected, setSelected] = React.useState(hrefElements[hrefElements.length - 1]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <a href="/" style={{ "textDecoration": "none", "color": "white" }} >
                        <Typography variant="h6" >
                            Data Table
                        </Typography>
                    </a>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                className={classes.drawer}
                variant="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <Link style={{ "textDecoration": "none", "color": "white" }} to="/" onClick={() => setSelected("")}>
                            <ListItem style={selected === "" ? { "backgroundColor": "rgba(255, 255, 255, 0.08)" } : {}} button key="Home">
                                <ListItemIcon><HomeIcon color={selected === "" ? "action" : "disabled"} /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link style={{ "backgroundColor": "white", "textDecoration": "none", "color": "white" }} to="/people" onClick={() => setSelected("people")}>
                            <ListItem style={selected === "people" ? { "backgroundColor": "rgba(255, 255, 255, 0.08)" } : {}} button key="People Info">
                                <ListItemIcon><PeopleIcon color={selected === "people" ? "action" : "disabled"} /></ListItemIcon>
                                <ListItemText primary="People Info" />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}