import React, { Component } from 'react'

import TableIcon from '@material-ui/icons/TableChartTwoTone';

export class Home extends Component {
    render() {
        return (
            <div style={{ "fontSize": "2em", "textAlign": "center" }}>
                <TableIcon style={{ "fontSize": "5em" }} />
                <h1 style={{ "margin": 0 }}>Data Table</h1>
                <p>Example of using Material-UI table</p>
            </div>
        )
    }
}

export default Home
