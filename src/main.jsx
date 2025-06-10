import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
