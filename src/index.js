import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import Root from './client/Root';
import './styles/main.scss';
=======
import './styles/main.scss';
import Root from './client/Root';
import * as serviceWorker from './serviceWorker';
>>>>>>> feature/header

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
<<<<<<< HEAD
=======
serviceWorker.unregister();
>>>>>>> feature/header
