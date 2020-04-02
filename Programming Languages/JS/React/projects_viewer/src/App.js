import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
import store from './store'

import {
  createMuiTheme
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Header from './components/layout/Header';
import Dashboard from './components/projects/Dashboard';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Dashboard />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
