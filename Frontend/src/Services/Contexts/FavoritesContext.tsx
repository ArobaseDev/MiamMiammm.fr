import React, { createContext, useState, useEffect } from 'react';
import Recipe from '../Interfaces/Recipes';

interface FavoritesContextType {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('Miam-Miammm-favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (recipe: Recipe) => {
    let updatedFavorites = [];
    if (favorites.some(fav => fav.id === recipe.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
    } else {
      updatedFavorites = [...favorites, recipe];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('Miam-Miammm-favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
