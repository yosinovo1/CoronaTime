import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./components/layout/Header";
import Dashboard from "./components/projects/Dashboard";
import ProjectData from "./components/projects/ProjectData";
import PageNotFound from "./components/common/PageNotFound";

import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

const theme = createMuiTheme({
  direction: "rtl",
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <Provider store={store}>
      <RTL>
        <ThemeProvider theme={theme}>
          <div dir="rtl" className="App">
            <Header />
            <Router>
              <Switch>
                <Route exact path="/projects" component={Dashboard} />
                <Route path="/projects/:id" component={ProjectData} />
                <Route path="/" exact>
                  <Redirect to="/projects" />
                </Route>
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Router>
          </div>
        </ThemeProvider>
      </RTL>
    </Provider>
  );
}

export default App;
