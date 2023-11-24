import React from 'react';

const Header: React.FC = ({ props }: any) => {
  return (
    <header id="Header" className="header" {...props}>
      <div className="logo">
        <a href="/">
            <span>Vennew</span>
        </a>
      </div>
      <nav className="navitgation">
        <a href="/#Footer">Link 1</a>
      </nav>
    </header>
  );
};

export default Header;
