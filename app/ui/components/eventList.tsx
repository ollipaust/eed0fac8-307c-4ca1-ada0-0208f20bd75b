// EventList.tsx
import React, { useEffect, useState } from 'react';
import EventSearch from './eventSearch'; // Adjust the path based on your project structure
import { useEventContext } from '../../utils/eventProvider';
import { cropTitle } from '~/utils/cropTitle';
import TimeFormat from '~/utils/formatTime';
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter';
import ImageLoader from '~/utils/imageLoader';
import { SvgIconCartPlus } from '../constants/svg/cartSvg';
import { SvgIconPin } from '../constants/svg/pinSvg';

const EventList: React.FC = () => {
  const { events } = useEventContext();
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const isDataReceived = events.length > 0;

    if (isDataReceived) {
      // Update the filtered events based on the search term
      setFilteredEvents(events);
    }
  }, [events]);

  const handleSearch = (term: string) => {
    // Update the filtered events based on the search term
    const filtered = events.filter((event) => {
      // Check for the term in multiple fields
      return (
        event.title.toLowerCase().includes(term.toLowerCase()) ||
        event.venue.name.toLowerCase().includes(term.toLowerCase()) ||
        event.city.toLowerCase().includes(term.toLowerCase()) ||
        event.country.toLowerCase().includes(term.toLowerCase())
        // Add more fields as needed
      );
    });

    setFilteredEvents(filtered);
  };

  return (
    <>
      <EventSearch onSearch={handleSearch} />

      <div className="eventsGrid">
        {filteredEvents.map((event, index) => (
          event.flyerFront && (
            <div key={event._id} className={`box box__${index}`}>
              <div className='box__head'>
                <ImageLoader imageUrl={event.flyerFront} alt="Event Flyer" />
                <div className='svgCartIcon__container'>
                  <SvgIconCartPlus
                    svgCartType="plus"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className='box__body'>
                <p>{cropTitle(event.title)}</p>
              </div>
              <div className='box__foot'>
                <p className='eventLocation'>
                  <SvgIconPin className="full" width={16} height={16} />
                  <strong>{event.venue.name}</strong>
                  {' in ' + capitalizeFirstLetter(event.city) + ', ' + event.country.toUpperCase()}
                </p>
                <p className='eventDate'>
                  <TimeFormat startTime={event.startTime} endTime={event.endTime} fallBackTime={event.date} />
                </p>
              </div>
            </div>
          )
        ))}
      </div>
    </>
  );
};

export default EventList;
