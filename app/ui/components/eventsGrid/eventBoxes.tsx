import React from 'react';
import ImageLoader from '~/utils/imageLoader';
import { SvgCartIconPlus } from '../../constants/svg/cartSvg';
import { SvgPinIcon } from '../../constants/svg/pinSvg';
import TimeFormat from '~/utils/formatDateAndTime';
import { useShoppingCartContext } from '~/utils/appContextProvider';

const EventBoxes: React.FC<{
  event: any;
  index: number;
  showSideDrawer: boolean;
  selectedEvent: any;
  handleCartIconClick: (event: any, title: string) => void;
  handleGoogleMapsLinkClick: (event: any) => void;
}> = React.memo(({ event, index, showSideDrawer, selectedEvent, handleGoogleMapsLinkClick }) => {
  const { addToCart, cart, maxCartItemsSelected} = useShoppingCartContext();
  const isAddToCartDisabled = cart.length >= maxCartItemsSelected;
  return (
    <div
      id={`EventsCardBox__${index}`}
      key={`${event._id}`}
      className={`eventsCardBox eventsCardBox__${index}`}
    >
      <div className="eventsCardBox__head">
        <ImageLoader imageUrl={event.flyerFront} alt="Event Flyer" />
        <div className="svgCartIcon__container">
          <SvgCartIconPlus
            svgCartType={'plus'}
            width={48}
            height={48}
            onClick={() => {
              if (!isAddToCartDisabled) {
                addToCart(event);
              }
            }}
            className={isAddToCartDisabled ? 'disabled' : ''}
          />
        </div>
      </div>
      <div className="eventsCardBox__body">
        <p>{event.title}</p>
      </div>
      <div className="eventsCardBox__foot">
        <p className="eventLocation">
          <SvgPinIcon className="full" width={16} height={16} />
          <strong>
            <a
              onClick={() => handleGoogleMapsLinkClick(event)}
              className={`eventLocation__venue--${showSideDrawer && selectedEvent === event ? 'active' : ''}`}
            >
              {event.venue.name}
            </a>
          </strong>
        </p>
        <p className="eventDate">
          <TimeFormat startTime={event.startTime} endTime={event.endTime} fallBackTime={event.date} />
        </p>
      </div>
    </div>
  );
},
(prevProps, nextProps) => {
  return prevProps.event === nextProps.event;
});

export default EventBoxes;
