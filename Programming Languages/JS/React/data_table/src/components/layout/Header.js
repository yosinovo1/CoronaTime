import React, { Component } from 'react';

import SideDrawer from '../layout/SideDrawer';

class Header extends Component {

    render() {
        return (
            <div style={{ "display": "flex", "backgroundColor": "rgba(255, 255, 255, 0.08)", "padding": "1em" }}>
                <SideDrawer />
                <a href="/#" style={{ "color": "white", textDecoration: "none" }}><h3 style={{ "margin": 0 }}>Data Table</h3></a>
            </div>
        )
    }
}


export default Header;
