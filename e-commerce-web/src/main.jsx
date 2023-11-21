import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx';
import './index.css';
import { CartProvider } from "./store/CartProvider.jsx";
import { AddressProvider } from "./store/AddressProvider.jsx";
import { UserProvider } from "./store/UserProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CartProvider>
            <AddressProvider>
              <App/>
            </AddressProvider>
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
