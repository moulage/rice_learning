import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/scenes.css';
import './styles/schedule.css';
import './styles/teaching.css';
import './styles/voice.css';
import './styles/teaching-flow.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
