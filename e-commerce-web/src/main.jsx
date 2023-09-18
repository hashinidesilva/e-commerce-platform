import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx';
import './index.css';
import { store } from "./store/store.jsx";
import { CartProvider } from "./store/CartProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CartProvider>
            <App/>
          </CartProvider>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
