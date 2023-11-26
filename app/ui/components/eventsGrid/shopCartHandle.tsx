import React, { useState, useEffect, useRef } from 'react';
import { SvgCartIconFull } from '../../constants/svg/cartSvg';
import { useShoppingCartContext } from '~/utils/appContextProvider';

const ShopCartHandler: React.FC = () => {
  const { cart, removeFromCart } = useShoppingCartContext();
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maxTitleLength = 40;

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };
  
  const handlePayNowClick = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const countedItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const cropTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.substring(0, maxLength - 3)}...` : title;
  };
  return (
    <div className="shopCart__container" ref={containerRef}>
      <button className="shopCart__handler" onClick={handleClick}>
        <SvgCartIconFull svgCartType="full" width={32} height={32} cartItemCount={cart.length} />
      </button>
      <div className={`shopCart shopCart--${isActive ? 'active' : 'inactive'}`}>
        <>
          <p className='dark'><b>Total Items:</b> {countedItems}</p>
          {cart.length > 0 ? (
            <>
              <ul className='shopCart__itemsList'>
                {cart.map((item) => (
                  <li className='shopCart__item' key={item._id}>
                    <span className='dark50'>
                      {cropTitle(item.title, maxTitleLength)}
                    </span>
                    <button className="shopCart__removeButton" onClick={() => removeFromCart(item)}>
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <button className="shopCart__payNowButton btn" onClick={handlePayNowClick}>
                Pay Now
              </button>            </>
          ) : (
            <p className='shopCart__item--empty dark75'>Nothing here, please buy something.</p>
          )}
        </>
      </div>
    </div>
  );
};

export default ShopCartHandler;
