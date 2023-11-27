import React from "react";
import { SvgSearchIcon } from "~/ui/constants/svg/searchSvg";
import { useSearch, useShoppingCartContext } from "~/utils/appContextProvider";
import ShopCartHandler from "~/ui/components/eventsGrid/shopCartHandle";

const Header: React.FC = ({ props }: any) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { cart } = useShoppingCartContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header id="Header" className="header" {...props}>
      <div className="logo">
        <a title="Vennew Logo" href="/">
          <span>Vennew</span>
        </a>
      </div>
      <div id="Search" className="eventSearch">
        <div className="searchInput__container">
          <SvgSearchIcon width={32} height={32} />
          <input
            className="eventSearchInput"
            type="text"
            id="searchInput"
            name="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search events"
            autoComplete="off"
            role="search"
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
