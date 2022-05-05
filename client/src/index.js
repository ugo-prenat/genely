import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import App from './App';

import './styles/index.scss'
import './styles/reset.scss'
import './styles/buttons.scss'
import './styles/loading.scss'
import './styles/skeleton.scss'
import './styles/path.scss'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
