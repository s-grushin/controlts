import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppGlobalDataProvider from './context/AppGlobalDataProvider'
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppGlobalDataProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AppGlobalDataProvider>
    </React.StrictMode>
);