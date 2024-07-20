import React, { createContext, useReducer, ReactNode } from 'react';
import { searchReducer, initialState } from './searchReducer';

const SearchContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within an AppProvider');
  }
  return context;
};