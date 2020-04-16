import React from 'react';
import './App.scss';
import Title from './Components/Title/Title.js';
import Login from './Components/Login/Login.js';
import NavBar from './Components/NavBar/NavBar.js';
import Content from './Components/Content/Content.js';

function App() {  
  return (
    <div className="App">
      <div className="head-container">
        <Title/>
        <Login/>
        <NavBar/>
        <div className="seperator"></div>
      </div>      
      <Content/>
    </div>
  );
}

export default App;
