require('dotenv').config({path: '.env'});
import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(
  <Routes showModal={false} />,
  document.getElementById('root') 
);