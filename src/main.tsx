import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
    <>
        <StrictMode>
            <HashRouter>
                <App />
            </HashRouter>
        </StrictMode>
        <ToastContainer />
    </>,
);
