import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/css/index.css';
import './assets/css/style.css';
import App from './App.tsx';
import RecipeDetail from './components/recipes/RecipeDetail.tsx';
import RecipeForm from './components/recipes/RecipeForm.tsx';
import FavoriteRecipes from './components/recipes/FavoriteRecipes.tsx';

const router = createBrowserRouter(
  [
    
    {
      path: '/', element: <App /> 
    },
    {
      path: '/recipes/:id', element: <RecipeDetail /> 
    },
    {
     path: '/favorites-recipes', element: <FavoriteRecipes /> 
    },
    {
     path: '/recipes/add', element: <RecipeForm /> 
    },

  ]
);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
