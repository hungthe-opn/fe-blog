import React from 'react';
import ReactDOM from 'react-dom';
import Application from "./Application";
import 'semantic-ui-css/semantic.min.css'
import "./i18n"

ReactDOM.render(
    <React.StrictMode>
            <Application/>
    </React.StrictMode>,
    document.getElementById("root")
);