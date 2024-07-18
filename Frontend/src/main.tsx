import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/css/index.css';
import './assets/css/style.css';
import App from './App.tsx';
import RecipeDetail from './components/recipes/RecipeDetail.tsx';

const router = createBrowserRouter(
  [
    
    {
      path: '/', element: <App /> 
    },
    {
      path: '/recipes/:id', element: <RecipeDetail /> 
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
