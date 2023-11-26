import React, { useEffect, useState } from 'react';
import { useEventContext } from '../../utils/eventProvider';
import { useShoppingCartContext } from '~/utils/shoppingCartContextProvider';
import { capitalizeFirstLetter } from '~/utils/capitalizeFirstLetter';
import ImageLoader from '~/utils/imageLoader';
import { SvgCartIconPlus } from '../constants/svg/cartSvg';
import { SvgPinIcon } from '../constants/svg/pinSvg';
import TimeFormat from '~/utils/formatTime';
import { formatDate } from '~/utils/formatDate';

interface EventCardsProps {
  searchTerm: string;
  apiKey: string;
}

const EventCards: React.FC<EventCardsProps> = ({ searchTerm, apiKey }) => {
  const { events } = useEventContext();
  const { addToCart, removeFromCart, cart } = useShoppingCartContext();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const availableEvents = Math.max(filteredEvents.length - cart.length, 0);

  useEffect(() => {
    const isDataReceived = events.length > 0;
  
    if (isDataReceived) {
      const initialEventsList = events
        .filter((event) => {
          return (
            event.startTime && event.endTime && event.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
        .sort((a, b) => {
          const dateA: Date = new Date(formatDate(a.startTime));
          const dateB: Date = new Date(formatDate(b.startTime));

          return dateA.getTime() - dateB.getTime();
        });
  
      setFilteredEvents(initialEventsList);
    }
  }, [events, searchTerm, apiKey]);  

  const handleGoogleMapsLinkClick = (event: any) => {
    setShowSideDrawer(true);
    setSelectedEvent(event);
  };
  
  const handleCartIconClick = (event: any) => {
    const isInCart = cart.some((item) => item._id === event._id);

    if (isInCart) {
      removeFromCart(event);
    } else {
      addToCart(event);
    }
  };

  const openGoogleMapsInNewTab = () => {
    if (selectedEvent) {
      window.open(
        `https://www.google.com/maps/dir//${encodeURIComponent(selectedEvent.venue.name)},${encodeURIComponent(selectedEvent.city)},${encodeURIComponent(selectedEvent.country)}`,
        '_blank'
      );
    }
  };

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };

  return (
    <>
      <div className="eventsResults">
        <span className='eventsResults__content'>{`${availableEvents} public events in London, UK.`}</span>
      </div>
      <div className="eventsGrid">
        {availableEvents > 0 ? (
          filteredEvents.map((event, index) => (
            event.flyerFront && (
              <div
                key={event._id}
                className={`eventsCardBox eventsCardBox__${index} ${cart.some((item) => item._id === event._id) ? 'hide' : ''}`}
              >
                <div className='eventsCardBox__head'>
                  <ImageLoader imageUrl={event.flyerFront} alt="Event Flyer" />
                  <div className='svgCartIcon__container'>
                    <SvgCartIconPlus
                      svgCartType={'plus'}
                      width={48}
                      height={48}
                      onClick={() => handleCartIconClick(event)}
                    />
                  </div>
                </div>
                <div className='eventsCardBox__body'>
                  <p>{event.title}</p>
                </div>
                <div className='eventsCardBox__foot'>
                  <p className='eventLocation'>
                    <SvgPinIcon className="full" width={16} height={16} />
                    <strong>
                      <a
                        onClick={() => handleGoogleMapsLinkClick(event)}
                        className={`eventLocation__direction ${showSideDrawer && selectedEvent === event ? 'active' : ''}`}
                      >
                        {event.venue.name}
                      </a>
                    </strong>
                  </p>
                  <p className='eventDate'>
                    <TimeFormat startTime={event.startTime} endTime={event.endTime} fallBackTime={event.date} />
                  </p>
                </div>
              </div>
            )
          ))
        ) : null }
      </div>

      <div className={`googleMapsSideDrawer ${showSideDrawer && selectedEvent ? 'googleMapsSideDrawer--visible' : ''}`}>
        {showSideDrawer && selectedEvent && (
          <>
            <iframe
              title={`Google Maps - ${selectedEvent.venue.name}, ${selectedEvent.city}, ${selectedEvent.country}`}
              className='googleMapsSideDrawer__iframe'
              width="100%"
              height="100%"
              style={{ border: '0' }}
              src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(`${selectedEvent.venue.name}, ${selectedEvent.city}, ${selectedEvent.country}`)}&key=${apiKey}`}
              allowFullScreen
            />
            <div className="googleMapsSideDrawer--hidden"></div>
          </>
        )}
        <div className="googleMapsSideDrawer__buttonsContainer">
          <button className='googleMapsSideDrawer__button' onClick={closeSideDrawer}>Close</button>
          <button className='googleMapsSideDrawer__button' onClick={openGoogleMapsInNewTab}>Open in Google Maps</button>
        </div>
      </div>
    </>
  );
};

export default EventCards;
