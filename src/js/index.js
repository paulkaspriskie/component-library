import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import inventory from './utils/inventory.json';
import App from './App';
import "../scss/app.scss";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App inventory={inventory} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
