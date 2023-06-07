import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/base.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import store from '../Redux/store';
// if (location.pathname == "/")
// {
//     location.replace("/admin/login")
// }
let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
)
