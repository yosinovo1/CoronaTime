import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPeopleData, updateSelectedProject, updateFilteredProjects } from '../../actions/people';
import SideDrawer from '../layout/SideDrawer';

class Header extends Component {
    static propTypes = {
        projects: PropTypes.array.isRequired,
        selectedProject: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.props.getPeopleData();
    }

    render() {
        return (
            <div style={{ "display": "flex", "backgroundColor": "rgba(255, 255, 255, 0.08)", "padding": "1em" }}>
                <SideDrawer />
                <a href="/#" style={{ "color": "white", textDecoration: "none" }}><h3 style={{ "margin": 0 }}>Data Table</h3></a>
            </div>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { getPeopleData, updateSelectedProject, updateFilteredProjects })(Header);
