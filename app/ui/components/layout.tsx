import React from 'react';
import type { ReactNode } from 'react';
import { EventProvider } from '../../utils/eventProvider';
import Header from './header';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <EventProvider>
      <div>
        <Header />
        <main>{children}</main>
        <footer id="Footer">
          <p>&copy; {new Date().getFullYear()} Vennew | Made with &hearts; by Olli Paust</p>
        </footer>
      </div>
    </EventProvider>
  );
};

export default Layout;
