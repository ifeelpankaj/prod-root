import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './__stylesheet__/_app.scss';
import { store } from './__redux__/store.js';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
