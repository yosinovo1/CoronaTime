import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { purple } from '@material-ui/core/colors';

import './App.css';

import { Provider } from 'react-redux';
import store from './store'

import {
  createMuiTheme
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Header from './components/layout/Header';
import Home from './components/common/Home';
import Dashboard from './components/projects/Dashboard';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  }
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <div style={{ "marginTop": "1rem", "display": "flex", "justify-content": "center" }}>
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
    </Provider>
  );
}

export default App;
