import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreProvider } from './Store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
