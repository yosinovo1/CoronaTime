import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import { Provider, useSelector } from 'react-redux';
import store from './store'
import {
  createMuiTheme
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Header from './components/layout/Header';
import Home from './components/common/Home';
import Dashboard from './components/people/Dashboard';
import { drawerWidth } from './components/layout/Header';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#121212',
    },
  }
});

function _App() {
  const isDrawerOpen = useSelector(state => state.common.isDrawerOpen)
  let marginLeft;
  if (isDrawerOpen) {
    marginLeft = `${drawerWidth}px`
  }
  else {
    marginLeft = '0'
  }


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <div className='App-body' style={{ 'marginLeft': marginLeft }}>
          <Switch>
            <Route path='/people' exact>
              <Dashboard />
            </Route>
            <Route path='/' exact>
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
