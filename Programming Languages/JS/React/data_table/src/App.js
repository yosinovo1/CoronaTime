import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import { Provider, useSelector } from 'react-redux';
import store from './store'

import {
  createMuiTheme
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Header from './components/layout/Header';
import Home from './components/common/Home';
import Dashboard from './components/people/Dashboard';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#121212',
    },
  }
});

function _App() {
  const isDrawerOpen = useSelector(state => state.common.isDrawerOpen)
  let marginLeft;
  if (isDrawerOpen) {
    marginLeft = "240px"
  }
  else {
    marginLeft = "0"
  }


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <div style={{ "marginLeft": marginLeft, "marginTop": "5rem", "display": "flex", "justify-content": "center" }}>
          <Switch>
            <Route path="/people" exact>
              <Dashboard />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <_App />
    </Provider>
  )
}

export default App;
