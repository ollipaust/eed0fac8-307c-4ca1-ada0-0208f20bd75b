import React from 'react';
import { SearchProvider } from '../../utils/searchContextProvider';
import Header from './header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SearchProvider>
      <Header />
      <main className="mainContent">{children}</main>
      <footer id="Footer" className="footer">
        <p>&copy; {new Date().getFullYear()} Vennew | Made with &hearts; by Olli Paust</p>
      </footer>
    </SearchProvider>
  );
};

export default Layout;
