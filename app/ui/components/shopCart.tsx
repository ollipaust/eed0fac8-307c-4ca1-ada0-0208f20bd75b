import {useState, useEffect, useRef} from "react";
import {SvgCartIconFull} from "~/ui/constants/svg/cartSvg";
import {useShoppingCartContext} from "~/utils/appContextProvider";
import TimeFormat from "~/utils/formatDateAndTime";

const ShopCartComponent = () => {
  const {shopCart, removeFromCart, maxCartItemsSelected} = useShoppingCartContext();
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maxTitleLength = 35;

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handlePayNowClick = () => {
    window.location.href = "/";
  };

  const handleClickOutside = (event: MouseEvent) => {
    const clickedOnRemoveBtn = (event.target as Element)?.closest("#RemoveItemBtn");
    const clickedOnPlusIcon = (event.target as Element)?.closest(".SvgCartIconPlus");

    if (containerRef.current && !containerRef.current.contains(event.target as Node) && !clickedOnRemoveBtn && !clickedOnPlusIcon) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const countedItems = shopCart.reduce((total, item) => total + (item.quantity || 1), 0);

  const cropTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.substring(0, maxLength - 3)}...` : title;
  };

  return (
    <div
      className="shopCart__container"
      ref={containerRef}
    >
      <button
        className="shopCart__handler"
        onClick={handleClick}
        aria-label="Shopping shopCart"
        role="button"
      >
        <SvgCartIconFull
          svgCartType="full"
          width={32}
          height={32}
          cartItemCount={shopCart.length}
        />
      </button>
      <div className={`shopCart shopCart--${isActive ? "active" : "inactive"}`}>
        <div className="shopCart__header dark">
          <b>Total Items in your shopCart:&nbsp;</b>
          <span>{countedItems}</span>
          {countedItems < maxCartItemsSelected ? null : <div className="warningText">Limit of {maxCartItemsSelected} items reached!</div>}
        </div>
        {shopCart.length > 0 ? (
          <>
            <ul className="shopCart__itemsList">
              {shopCart.map((item, index) => (
                <li
                  className="shopCart__item"
                  key={item._id}
                >
                  <div className="dark">{`${index + 1}. ${cropTitle(item.title, maxTitleLength)}`}</div>
                  <button
                    id="RemoveItemBtn"
                    className="shopCart__removeButton"
                    onClick={() => removeFromCart(item)}
                    aria-label="Remove Item"
                    role="button"
                  >
                    <span>X</span>
                  </button>
                  <div className="shopCart__itemsDate dark50 smallText">
                    <TimeFormat
                      startTime={item.startTime}
                      endTime={item.endTime}
                      fallBackTime={item.date}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="hr" />
            <button
              className="shopCart__payNowButton btn"
              onClick={handlePayNowClick}
            >
              Checkout
            </button>
          </>
        ) : (
          <div className="shopCart__item--empty dark75">No items added yet.</div>
        )}
      </div>
    </div>
  );
};

export default ShopCartComponent;
