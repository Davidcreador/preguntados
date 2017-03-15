import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import Jugar from './Jugar';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App} />
    <Route path='/jugar' component={Jugar} />
  </Router>,
  document.getElementById('root')
);
