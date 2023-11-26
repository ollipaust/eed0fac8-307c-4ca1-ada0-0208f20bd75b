import React from 'react';
import Header from './header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
        <Header />
        <main className="mainContent">{children}</main>
      <footer id="Footer" className="footer">
        <p>&copy; {new Date().getFullYear()} Vennew | Made with &hearts; by Olli Paust</p>
      </footer>
    </>
  );
};

export default Layout;
