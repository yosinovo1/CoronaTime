import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { getPeopleData } from '../../actions/people';


class Dashboard extends Component {
    static propTypes = {
        selectedProject: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.showFields = ["serialNumber", "gush", "helka", "address", "customer", "created_by"];
        this.theme = createMuiTheme({
            palette: {
                type: "dark",
                primary: {
                    main: '#121212',
                },
            },
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={this.theme}>
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
                            filtering: true,
                            grouping: true,
                            exportButton: true,
                            exportAllData: true,
                            sorting: true,
                            selection: true,
                            actionsColumnIndex: -1,
                        }}
                        actions={[
                            {
                                icon: 'refresh',
                                tooltip: 'Refresh Data',
                                isFreeAction: true,
                                onClick: () => this.props.getPeopleData()
                            },
                            {
                                tooltip: 'Remove All Selected Users',
                                icon: 'delete',
                                onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                            }
                        ]}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {
                                            const data = this.state.data;
                                            data.push(newData);
                                            this.setState({ data }, () => resolve());
                                        }
                                        resolve()
                                    }, 1000)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {
                                            const data = this.state.data;
                                            const index = data.indexOf(oldData);
                                            data[index] = newData;
                                            this.setState({ data }, () => resolve());
                                        }
                                        resolve()
                                    }, 1000)
                                }),
                            // onRowDelete: oldData =>
                            //     new Promise((resolve, reject) => {
                            //         setTimeout(() => {
                            //             {
                            //                 let data = this.state.data;
                            //                 const index = data.indexOf(oldData);
                            //                 data.splice(index, 1);
                            //                 this.setState({ data }, () => resolve());
                            //             }
                            //             resolve()
                            //         }, 1000)
                            //     }),
                        }}
                        detailPanel={rowData => {
                            return (
                                <div style={{ "display": "flex", "justifyContent": "center" }}>
                                    <p>{`You clicked on ${rowData.name} ${rowData.surname}`}</p>
                                </div>
                            )
                        }}
                        onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    />
                </Card>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    peopleData: state.people.peopleData
});

export default connect(mapStateToProps, { getPeopleData })(Dashboard)
