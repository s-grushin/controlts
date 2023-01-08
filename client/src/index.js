import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import AuthProvider from './context/AuthProvider';
import AppGlobalDataProvider from './context/AppGlobalDataProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppGlobalDataProvider>
            <App />
        </AppGlobalDataProvider>
    </React.StrictMode>
);