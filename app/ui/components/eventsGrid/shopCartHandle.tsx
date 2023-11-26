import React, { useState, useEffect, useRef } from 'react';
import { SvgCartIconFull } from '../../constants/svg/cartSvg';
import { useShoppingCartContext } from '~/utils/appContextProvider';

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
      <div className={`rectangle rectangle--${isActive ? 'active' : 'inactive'}`}>
        {isActive && (
          <div className="cartItems">
            <p className=''>Your Cart</p>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item) => (
                  <li key={item._id}>{item.title}</li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCartHandler;
