import React, { useEffect, useState } from 'react';
import { useEventContext } from '../../utils/eventProvider';
import { useShoppingCartContext } from '~/utils/shoppingCartContextProvider';
import { capitalizeFirstLetter } from '~/utils/capitalizeFirstLetter';
import ImageLoader from '~/utils/imageLoader';
import { SvgCartIconPlus } from '../constants/svg/cartSvg';
import { SvgPinIcon } from '../constants/svg/pinSvg';
import TimeFormat from '~/utils/formatTime';

interface EventCardProps {
  searchTerm: string;
  apiKey: string;
}

const EventCard: React.FC<EventCardProps> = ({ searchTerm, apiKey }) => {
  const { events } = useEventContext();
  const { addToCart } = useShoppingCartContext();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const resultAmount = filteredEvents.length;

  useEffect(() => {
    const isDataReceived = events.length > 0;

    if (isDataReceived) {
      const filtered = events.filter((event) => {
        return (
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) // ||
          // event.venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // event.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // event.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setFilteredEvents(filtered);
    }
  }, [events, searchTerm, apiKey]);

  const handleGoogleMapsLinkClick = (event: any) => {
    setShowSideDrawer(true);
    setSelectedEvent(event);
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
        <span className='eventsResults__content h2'>{`Public Events: ${resultAmount}`}</span>
      </div>
      <div className="eventsGrid">
        {resultAmount > 0 ? (
          filteredEvents.map((event, index) => (
            event.flyerFront && (
              <div key={event._id} className={`box box__${index}`}>
                <div className='box__head'>
                  <ImageLoader imageUrl={event.flyerFront} alt="Event Flyer" />
                  <div className='svgCartIcon__container'>
                  <SvgCartIconPlus
                    svgCartType="plus"
                    width={48}
                    height={48}
                    onClick={() => addToCart(event)} // Add this line to call addToCart when the SVG is clicked
                  />
                </div>
                </div>
                <div className='box__body'>
                  <p>{event.title}</p>
                </div>
                <div className='box__foot'>
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
                    {' in ' + capitalizeFirstLetter(event.city) + ', ' + event.country.toUpperCase()}
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

export default EventCard;
