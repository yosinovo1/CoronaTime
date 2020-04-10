import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./components/layout/Header";
import Dashboard from "./components/projects/Dashboard";

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
            <Dashboard />
          </div>
        </ThemeProvider>
      </RTL>
    </Provider>
  );
}

export default App;
