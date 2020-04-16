import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
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
import { SET_DRAWER_OPEN_STATE } from '../../actions/types';

export const drawerWidth = 240;
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
}));

export default function Header() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const hrefElements = window.location.href.split("/");
    const [selected, setSelected] = React.useState(hrefElements[hrefElements.length - 1]);
    const dispatch = useDispatch()
    const selectedItemStyle = { "backgroundColor": "rgba(255, 255, 255, 0.08)" };

    const handleMenuButtonClick = () => {
        dispatch({ type: SET_DRAWER_OPEN_STATE, payload: !open })
        setOpen(!open)
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleMenuButtonClick}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <a href="/" className="App-link" >
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
                        <Link className="App-link" to="/" onClick={() => setSelected("")}>
                            <ListItem style={selected === "" ? selectedItemStyle : {}} button key="Home">
                                <ListItemIcon><HomeIcon color={selected === "" ? "action" : "disabled"} /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link className="App-link" to="/people" onClick={() => setSelected("people")}>
                            <ListItem style={selected === "people" ? selectedItemStyle : {}} button key="People Info">
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