

import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
/*import '../node_modules/bootstrap/dist/css/bootstrap.css';*/
// import "bootstrap/dist/js/bootstrap.min.js";

import './index.css'
import './App.css';

import './assets/css/all.min.css';
import './assets/css/style.css';

/*import $ from "jquery"; */
/*const { JSDOM } = require("jsdom");*/
//const { window } = new JSDOM("");
//const $ = require("jquery")(window);

//import '../node_modules/jquery-nice-select/js/jquery.js'
//import '../node_modules/jquery-nice-select/js/jquery.nice-select.js'
//import '../node_modules/jquery-nice-select/css/nice-select.css'

import App from './App.jsx'
//import '../assets/css/index-7916c2b0.css';
//import '../assets/css/dashboard.css';

import { Provider } from "react-redux";
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { PropertyMetaTags } from "./components";

/*import reportWebVitals from './reportWebVitals';*/
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>               
                <App />
            </React.StrictMode>
        </PersistGate>
    </Provider>
)
/*reportWebVitals();*/



//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.jsx'

//createRoot(document.getElementById('root')).render(
//    <StrictMode>
//        <App />
//    </StrictMode>,
//)