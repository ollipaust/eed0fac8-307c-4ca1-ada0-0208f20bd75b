//eventBoxes.tsx
import React from 'react';
import ImageLoader from '~/utils/imageLoader';
import { SvgCartIconPlus } from '../constants/svg/cartSvg';
import { SvgPinIcon } from '../constants/svg/pinSvg';
import TimeFormat from '~/utils/formatDateAndTime';

const EventBoxes: React.FC<{
  event: any;
  index: number;
  cart: any[];
  handleCartIconClick: (event: any) => void;
  handleGoogleMapsLinkClick: (event: any) => void;
  showSideDrawer: boolean;
  selectedEvent: any;
}> = React.memo(
  ({ event, index, cart, handleCartIconClick, handleGoogleMapsLinkClick, showSideDrawer, selectedEvent }) => {
    return (
      <div
        key={`${event._id}-${cart.some((item) => item._id === event._id)}`}
        className={`eventsCardBox eventsCardBox__${index} ${
          cart.some((item) => item._id === event._id) ? 'hide' : ''
        }`}
      >
        <div className="eventsCardBox__head">
          <ImageLoader imageUrl={event.flyerFront} alt="Event Flyer" />
          <div className="svgCartIcon__container">
            <SvgCartIconPlus
              svgCartType={'plus'}
              width={48}
              height={48}
              onClick={() => handleCartIconClick(event)}
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
                className={`eventLocation__direction ${
                  showSideDrawer && selectedEvent === event ? 'active' : ''
                }`}
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
    return (
      prevProps.cart.length === nextProps.cart.length &&
      prevProps.selectedEvent === nextProps.selectedEvent
    );
  }
);

export default EventBoxes;
