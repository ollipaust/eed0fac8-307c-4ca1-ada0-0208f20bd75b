import React, { useEffect, useState } from 'react';
import { useEventContext } from '../../utils/eventProvider';
import { capitalizeFirstLetter } from '~/utils/capitalizeFirstLetter';
import ImageLoader from '~/utils/imageLoader';
import { SvgCartIconPlus } from '../constants/svg/cartSvg';
import { SvgPinIcon } from '../constants/svg/pinSvg';
import TimeFormat from '~/utils/formatTime';

interface EventListProps {
  searchTerm: string;
}

const EventList: React.FC<EventListProps> = ({ searchTerm }) => {
  const { events } = useEventContext();
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const isDataReceived = events.length > 0;

    if (isDataReceived) {
      const filtered = events.filter((event) => {
        return (
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setFilteredEvents(filtered);
    }
  }, [events, searchTerm]);

  // Events & Cities comparison test
  useEffect(() => {
    const isDataReceived = events.length > 0;
    if (isDataReceived) {
      const londonEventsCount = events.filter((event) => event.city.toLowerCase() === 'london').length;
      console.log('Total events:', events.length);
      console.log('Events with the city "london":', londonEventsCount);
    }
  }, [events]);
  return (
    <>
      <div className="eventsGrid">
        {filteredEvents.map((event, index) => (
          event.flyerFront && (
            <div key={event._id} className={`box box__${index}`}>
              <div className='box__head'>
                <ImageLoader imageUrl={event.flyerFront} alt="Event Flyer" />
                <div className='svgCartIcon__container'>
                  <SvgCartIconPlus
                    svgCartType="plus"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className='box__body'>
                <p>{event.title}</p>
              </div>
              <div className='box__foot'>
                <p className='eventLocation'>
                  <SvgPinIcon className="full" width={16} height={16} />
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
