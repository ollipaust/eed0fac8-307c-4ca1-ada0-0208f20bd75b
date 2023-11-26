// Add the following imports at the top of your file
import React, { useState, useEffect, useRef } from 'react';
import { SvgCartIconFull } from '../constants/svg/cartSvg';
import { useShoppingCartContext } from '~/utils/shoppingCartContextProvider';

// Define your component
const ShopCartHandler: React.FC = () => {
  const { cart } = useShoppingCartContext();
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="shopCart__container" ref={containerRef}>
      <button className="shopCart__handler" onClick={handleClick}>
        <SvgCartIconFull svgCartType="full" width={32} height={32} cartItemCount={cart.length} />
      </button>
      <div className={`rectangle rectangle--${isActive ? 'active' : 'inactive'}`} />
    </div>
  );
};

export default ShopCartHandler;
