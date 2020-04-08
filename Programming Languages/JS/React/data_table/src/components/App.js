import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header';
import Dashboard from './projects/Dashboard';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div style={{ "display": "flex", "justify - content": "center" }}>
                    <Dashboard />
                </div>
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));