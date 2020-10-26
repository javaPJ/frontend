import React from 'react';
import { Route } from 'react-router-dom';
import Header from './../components/Header/Header';
import ServerBar from './../components/ServerBarPage/ServerBar/ServerBar';

function App() {
  return (
    <div>
      <ServerBar></ServerBar>
      <Header></Header>
    </div>
  );
}

export default App;
