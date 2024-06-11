import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
    <StrictMode>
        <HashRouter basename="/fe-react-2024">
            <App />
        </HashRouter>
    </StrictMode>,
);
