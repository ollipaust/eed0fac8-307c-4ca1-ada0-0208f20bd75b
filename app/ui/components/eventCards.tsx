//eventCards.tsx
import React, { useEffect, useState } from 'react';
import { useEventContext } from '../../utils/eventProvider';
import { useShoppingCartContext } from '~/utils/shoppingCartContextProvider';
import { formatDisplayDate, formatRawDate } from '~/utils/formatDateAndTime';
import EventBoxes from './eventBoxes';
import EventSideDrawer from './eventSideDrawer';

interface EventCardsProps {
  searchTerm: string;
  apiKey: string;
}

const EventCards: React.FC<EventCardsProps> = ({ searchTerm, apiKey }) => {
  const { eventsByDate, loading, error } = useEventContext();
  const { addToCart, removeFromCart, cart } = useShoppingCartContext();
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const availableEvents = Math.max(filteredEvents.length - cart.length, 0);
  let currentDate: string = '0000-00-00T00:00:00.000';

  useEffect(() => {
    if (!loading && !error) {
      const initialEventsList = Object.values(eventsByDate)
        .flat()
        .filter((event) => {
          return (
            event.startTime &&
            event.endTime &&
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
        .sort((a, b) => {
          const dateA: Date = new Date(formatRawDate(a.startTime));
          const dateB: Date = new Date(formatRawDate(b.startTime));

          return dateB.getTime() - dateA.getTime();
        });

      setFilteredEvents(initialEventsList);
    }
  }, [eventsByDate, loading, error, searchTerm, apiKey]);

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

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };

  const openGoogleMapsInNewTab = () => {
    if (selectedEvent && selectedEvent.venue && selectedEvent.city && selectedEvent.country) {
      window.open(
        `https://www.google.com/maps/dir//${encodeURIComponent(selectedEvent.venue.name)},${encodeURIComponent(selectedEvent.city)},${encodeURIComponent(selectedEvent.country)}`,
        '_blank'
      );
    }
  };

  const EventDateSeparator: React.FC<{ date: string; id: number }> = ({ date, id }) => {
    useEffect(() => {
      const separatorElement = document.getElementById(`${id}`);
      
      if (separatorElement) {
        const hasHideClass = Array.from(separatorElement.children).some(child => child.classList.contains('hide'));
  
        if (hasHideClass) {
          console.log('has hide class')
        } else {
          console.log('has NO hide class')
        }
      }
    }, []);
  
    return (
      <div id={`Seperator__${id.toString()}`} className="eventDateSeparator">
        <span>{`All events scheduled for`}&nbsp;<span>{formatDisplayDate(date)}</span></span>
      </div>
    );
  };
  
     return (
    <>
      <div className="eventsResults">
        <span className='eventsResults__content'>{`${availableEvents} public events in London, UK.`}</span>
      </div>

      <div className="eventsGrid">
        {availableEvents > 0 && (
          filteredEvents.map((event, index) => {
            const eventDate = formatRawDate(event.startTime);

            // Check if the date has changed, render separator if needed
            if (currentDate !== eventDate) {
              currentDate = eventDate;
              return (
                <React.Fragment key={`separator-${index}`}>
                  <EventDateSeparator id={index} date={currentDate} />
                  {/* Render the event after the separator */}
                  <EventBoxes
                    event={event}
                    index={index}
                    cart={cart}
                    handleCartIconClick={handleCartIconClick}
                    handleGoogleMapsLinkClick={handleGoogleMapsLinkClick}
                    showSideDrawer={showSideDrawer}
                    selectedEvent={selectedEvent}
                  />
                </React.Fragment>
              );
            }

            // Render the event without a separator
            return (
              <EventBoxes
                key={event._id}
                event={event}
                index={index}
                cart={cart}
                handleCartIconClick={handleCartIconClick}
                handleGoogleMapsLinkClick={handleGoogleMapsLinkClick}
                showSideDrawer={showSideDrawer}
                selectedEvent={selectedEvent}
              />
            );
          })
        )}
      </div>

      <EventSideDrawer
        showSideDrawer={showSideDrawer}
        selectedEvent={selectedEvent}
        apiKey={apiKey}
        closeSideDrawer={closeSideDrawer}
        openGoogleMapsInNewTab={openGoogleMapsInNewTab}
      />
    </>
  );
};

export default EventCards;
