import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App/App';
import {Provider} from "react-redux";
import {store} from "./App/store";
import {BrowserRouter} from "react-router-dom";

const rerenderSeaEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
        , document.getElementById('root'));
}
rerenderSeaEntireTree()

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App/App', () => {
        rerenderSeaEntireTree()
    })
}