import React from 'react';
import ReactDOM from 'react-dom';
import Application from "./Application";
import 'semantic-ui-css/semantic.min.css'
require('dotenv').config()
ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,

  document.getElementById("root")
);