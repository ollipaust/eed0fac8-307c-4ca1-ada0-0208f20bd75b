// header.tsx
import React from 'react';
import { SvgSearchIcon } from '~/ui/constants/svg/searchSvg';
import { useSearch } from '../../utils/searchContextProvider';
import { useShoppingCartContext } from '~/utils/shoppingCartContextProvider';
import ShopCartHandler from './shopCartHandle'; // Adjust the path accordingly

const Header: React.FC = ({ props }: any) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { cart } = useShoppingCartContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header id="Header" className="header" {...props}>
      <div className="logo">
        <a href="/">
          <span>Vennew</span>
        </a>
      </div>
      <div>
        <div className="searchContainer">
          <SvgSearchIcon width={32} height={32} />
          <input
            className="eventSearchInput"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <nav className="navigation">
        <ShopCartHandler />
      </nav>
    </header>
  );
};

export default Header;
