import React, { Component } from 'react';

import Card from '@material-ui/core/Card';

import { connect } from 'react-redux';
import MaterialTable from 'material-table';

import { getPeopleData, setPeopleData } from '../../actions/people';

const citiesLookup = { 1: 'Netanya', 2: 'Tel-Aviv' };

class Dashboard extends Component {

    componentDidMount() {
        this.props.getPeopleData()
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
                            lookup: citiesLookup,
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
                        headerStyle: {
                            "fontWeight": "bold",
                        }
                    }}
                    actions={[
                        {
                            icon: 'refresh',
                            tooltip: 'Refresh Data',
                            isFreeAction: true,
                            onClick: () => this.props.getPeopleData()
                        },
                        {
                            tooltip: 'Remove All Selected Rows',
                            icon: 'delete',
                            onClick: (evt, dataToRemove) => {
                                const data = this.props.peopleData;
                                dataToRemove.forEach(element => {
                                    const index = data.indexOf(element);
                                    data.splice(index, 1)
                                });
                                this.props.getPeopleData()
                                this.props.setPeopleData(data);
                            }
                        }
                    ]}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        const data = this.props.peopleData;
                                        data.push(newData);
                                        this.props.getPeopleData();
                                        this.props.setPeopleData(data);
                                    }
                                    resolve()
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (newData !== oldData) {
                                        const data = this.props.peopleData;
                                        const index = data.indexOf(oldData);
                                        data[index] = newData;
                                        this.props.getPeopleData()
                                        this.props.setPeopleData(data);
                                    }
                                    resolve()
                                }, 1000)
                            })
                    }}
                    detailPanel={rowData => {
                        return (
                            <div style={{ "display": "flex", "justifyContent": "center" }}>
                                <p>{`${rowData.name} ${rowData.surname} was born in ${rowData.birthYear} at ${citiesLookup[rowData.birthCity]}`}</p>
                            </div>
                        )
                    }}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    peopleData: state.people.peopleData
});

export default connect(mapStateToProps, { getPeopleData, setPeopleData })(Dashboard)
