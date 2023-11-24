import React from 'react';
import { useEventContext } from '../../utils/eventProvider';
import { cropTitle } from '~/utils/cropTitle';
import TimeFormat from '~/utils/formatTime';

const EventList: React.FC = ({ props }: any) => {
  const { events } = useEventContext();
  const flyerImageMaxWidth = '500px';
  return (
    <div className="eventsGrid" {...props}>
      {events.map((event, index) => (
        <div key={event._id} className={`box box__${index}`}>
          <div className='box__head'>
            <img src={event.flyerFront ? event.flyerFront : '/placeholder.png'} alt="Event Flyer" style={{ maxWidth: flyerImageMaxWidth }} />
          </div>
          <div className='box__body'>
            <span>{cropTitle(event.title)}</span>
          </div>
          <div className='box__foot'>
            <TimeFormat startTime={event.startTime} endTime={event.endTime} fallBackTime={event.date} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
