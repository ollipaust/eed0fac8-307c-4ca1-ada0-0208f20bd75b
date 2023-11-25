import React from 'react';
import { SvgCartIconFull } from '../constants/svg/cartSvg';
import { useSearch } from '../../utils/searchContextProvider';
import { SvgSearchIcon } from '~/ui/constants/svg/searchSvg'; // Update the import path accordingly
import { useShoppingCartContext } from '~/utils/shoppingCartContextProvider';

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
        <SvgCartIconFull svgCartType="full" width={32} height={32} cartItemCount={cart.length} />
      </nav>
    </header>
  );
};

export default Header;