import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/css/index.css';
import './assets/css/style.css';
import App from './App.tsx';

const router = createBrowserRouter(
  [
    
    {
      path: '/', element: <App /> 
    },
    {
    //  path: '/recipe/:id', element: <App /> 
    },
    {
   //   path: '/favorites-recipes', element: <App /> 
    },

  ]
);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
