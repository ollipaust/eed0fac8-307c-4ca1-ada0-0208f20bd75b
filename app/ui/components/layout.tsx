import React from 'react';
import { SearchProvider } from '../../utils/searchContextProvider';
import Header from './header';
import { ShoppingCartProvider } from '~/utils/shoppingCartContextProvider';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SearchProvider>
      
      <ShoppingCartProvider>
        <Header />
        <main className="mainContent">{children}</main>
      </ShoppingCartProvider>
      <footer id="Footer" className="footer">
        <p>&copy; {new Date().getFullYear()} Vennew | Made with &hearts; by Olli Paust</p>
      </footer>
    </SearchProvider>
  );
};

export default Layout;
