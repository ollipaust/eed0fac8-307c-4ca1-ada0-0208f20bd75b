import React, { createContext, useContext, useState } from 'react';

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within the SearchProvider');
  }
  return context;
};
