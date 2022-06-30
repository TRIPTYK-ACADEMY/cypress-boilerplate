/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import './assets/sidebar.css';
import './assets/ui.css';
import './assets/toast.css';
import './assets/loader.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
