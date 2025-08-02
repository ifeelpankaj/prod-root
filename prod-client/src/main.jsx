import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './__redux__/store.js';
import './__stylesheet__/app.scss';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    </StrictMode>
);
