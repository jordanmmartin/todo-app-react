import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app';

import './stylesheets/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('main'));
});
