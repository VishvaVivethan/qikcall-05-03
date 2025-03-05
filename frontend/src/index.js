import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Route from './routes'
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// Ensure the DOM element exists before attempting to render
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
  );
}

// Register the service worker if desired; otherwise, leave it unregistered
serviceWorkerRegistration.unregister(); 

// Optionally measure performance
reportWebVitals();
