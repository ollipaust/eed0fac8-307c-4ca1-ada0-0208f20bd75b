import React, {useEffect, useState} from "react";
import {useEventContext, useShoppingCartContext, useSearch} from "~/utils/appContextProvider";
import {formatDisplayDate, formatRawDate} from "~/utils/formatDateAndTime";
import EventBoxes from "~/ui/components/eventsGrid/eventsBoxes";
import EventSideDrawer from "~/ui/components/eventsGrid/eventsSideDrawer";

interface EventsGridComponentProps {
  googleMapsApiKey: string;
}

const EventsGridComponent: React.FC<EventsGridComponentProps> = ({ googleMapsApiKey }) => {
  const {eventsByDate, loading, error} = useEventContext();
  const {addToCart, removeFromCart, shopCart} = useShoppingCartContext();
  const {searchTerm} = useSearch();
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [showSideDrawer, setShowSideDrawer] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const availableEvents = Math.max(filteredEvents.length, 0);
  let currentDate: string = "0000-00-00T00:00:00.000";

  useEffect(() => {
    if (!loading && !error) {
      const initialEventsList = Object.values(eventsByDate)
        .flat()
        .filter((event: any) => {
          return event.startTime && event.endTime && event.title.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .sort((a: any, b: any) => {
          const dateA: Date = new Date(formatRawDate(a.startTime));
          const dateB: Date = new Date(formatRawDate(b.startTime));
  
          return dateB.getTime() - dateA.getTime();
        });
  
      const filteredEventsNotInCart = initialEventsList.filter((event) => {
        return !shopCart.some((item) => item._id === event._id);
      });
  
      setFilteredEvents(filteredEventsNotInCart);
    }
  }, [eventsByDate, loading, error, searchTerm, googleMapsApiKey, shopCart]);

  const handleGoogleMapsLinkClick = (event: any) => {
    setSelectedEvent(event);
    setShowSideDrawer(true);
  };

  const handleCartIconClick = (event: any) => {
    const isInCart = shopCart.some((item) => item._id === event._id);

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
        "_blank",
      );
    }
  };

  const EventDateSeparator: React.FC<{separatorDisplayedDate: string; id: number}> = ({separatorDisplayedDate, id}) => {
    const separatorId = `Separator__${id}`;

    return (
      <div
        id={separatorId}
        className="eventDateSeparator"
      >
        <span>
          All events scheduled for&nbsp;<span>{formatDisplayDate(separatorDisplayedDate)}</span>:
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="eventsResults">
        <span className="eventsResults__content">{`${availableEvents} public events in London, UK.`}</span>
      </div>

      <div className="eventsGrid">
        {filteredEvents.map((event: any, index: number) => {
          const eventDate = formatRawDate(event.startTime);
          const isDifferentDate = currentDate !== eventDate;

          if (isDifferentDate) {
            currentDate = eventDate;
            return (
              <React.Fragment key={`separator-${index}`}>
                <EventDateSeparator
                  id={index}
                  separatorDisplayedDate={eventDate}
                />
                <EventBoxes
                  key={event._id}
                  event={event}
                  index={index}
                  handleCartIconClick={handleCartIconClick}
                  openGoogleMapsInNewTab={handleGoogleMapsLinkClick}
                  selectedEvent={selectedEvent}
                />
              </React.Fragment>
            );
          }

          return (
            <EventBoxes
              key={event._id}
              event={event}
              index={index}
              handleCartIconClick={handleCartIconClick}
              openGoogleMapsInNewTab={handleGoogleMapsLinkClick}
              selectedEvent={selectedEvent}
            />
          );
        })}
      </div>

      <EventSideDrawer
        showSideDrawer={showSideDrawer}
        selectedEvent={selectedEvent}
        googleMapsApiKey={googleMapsApiKey}
        closeSideDrawer={closeSideDrawer}
        openGoogleMapsInNewTab={openGoogleMapsInNewTab}
      />
    </>
  );
};

export default EventsGridComponent;
