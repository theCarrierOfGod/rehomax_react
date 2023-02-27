import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './dark.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bulma/css/bulma.css";
import "bulmajs/dist/bulmajs.js";
import 'jquery';
import 'popper.js';
import './poppins.css';
import "@fontsource/poppins";
import 'material-icons/iconfont/outlined.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
