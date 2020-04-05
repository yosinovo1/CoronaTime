import React, { Component, Fragment } from 'react';

import Card from '@material-ui/core/Card';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { responsiveFontSizes } from '@material-ui/core';

class Dashboard extends Component {
    static propTypes = {
        selectedProject: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.showFields = ["serialNumber", "gush", "helka", "address", "customer", "created_by"];
    }

    render() {
        return (
            <Card style={{ "display": "inline-block", "backgroundColor": "rgba(255, 255, 255, 0.05)", "margin": "1.5rem", "padding": "1.5rem" }}>
                <MaterialTable
                    title="People Info"
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Surname', field: 'surname' },
                        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                        {
                            title: 'Birth Place',
                            field: 'birthCity',
                            lookup: { 1: 'Netanya', 2: 'Tel-Aviv' },
                        },
                    ]}
                    data={this.props.peopleData}
                    options={{
                        filtering: true
                    }}
                />
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    peopleData: state.people.peopleData
});

export default connect(mapStateToProps)(Dashboard)
