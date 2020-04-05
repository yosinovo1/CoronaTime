import React from 'react';
import { Link } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/Contacts';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles({
    list: {
        width: 200
    },
    fullList: {
        width: 'auto',
    },
});

export default function SideDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link style={{ "textDecoration": "none", "color": "white" }} to="/">
                    <ListItem button key="Home">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Divider />
                <Link style={{ "textDecoration": "none", "color": "white" }} to="/people">
                    <ListItem button key="People Info">
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="People Info" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <div>
            <IconButton style={{ "padding": "0", "margin-right": "1rem" }} onClick={toggleDrawer("left", true)}><MenuIcon /></IconButton>
            <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
                {list("left")}
            </Drawer>
        </div>
    );
}
