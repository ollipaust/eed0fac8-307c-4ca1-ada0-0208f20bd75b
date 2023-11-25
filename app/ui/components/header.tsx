import React from 'react';
import { SvgIconCartFull } from '../constants/svg/cartSvg';

const Header: React.FC = ({ props }: any) => {
  return (
    <header id="Header" className="header" {...props}>
      <div className="logo">
        <a href="/">
            <span>Vennew</span>
        </a>
      </div>
      <nav className="navigation">
        <SvgIconCartFull
          svgCartType="full"
          width={24}
          height={24}
        />
      </nav>
    </header>
  );
};

export default Header;
