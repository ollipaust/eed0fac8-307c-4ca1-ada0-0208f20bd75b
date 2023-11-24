import React from 'react';
import type { ReactNode } from 'react';
import { EventProvider } from '../../utils/eventProvider';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <EventProvider>
      <div>
        <header>
          <h1>Your App Title</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Your Company</p>
        </footer>
      </div>
    </EventProvider>
  );
};

export default Layout;
