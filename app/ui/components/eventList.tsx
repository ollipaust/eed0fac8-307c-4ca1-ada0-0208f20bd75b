import React, { useEffect, useState } from 'react';
import { useEventContext } from '../../utils/eventProvider';
import { cropTitle } from '~/utils/cropTitle';
import TimeFormat from '~/utils/formatTime';
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter';
import ImageLoader from '~/utils/imageLoader';
import { SvgIconCartPlus } from '../constants/svg/cartSvg';
import { SvgIconPin } from '../constants/svg/pinSvg';

const EventList: React.FC = ({ props }: any) => {
  const { events } = useEventContext();
  const [searchTerm, setSearchTerm] = useState<string>('');

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
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="eventsGrid" {...props}>
        {events
          .filter((event) => {
            const titleMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
            const venueMatch = event.venue.name.toLowerCase().includes(searchTerm.toLowerCase());
            const cityMatch = event.city.toLowerCase().includes(searchTerm.toLowerCase());
            const countryMatch = event.country.toLowerCase().includes(searchTerm.toLowerCase());

            return titleMatch || venueMatch || cityMatch || countryMatch;
          })
          .map((event, index) => (
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
                  {cropTitle(event.title)}
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
