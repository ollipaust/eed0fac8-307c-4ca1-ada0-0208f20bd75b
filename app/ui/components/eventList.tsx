import React from 'react';
import { useEventContext } from '../../utils/eventProvider';

const EventList: React.FC = ({props}: any) => {
  const { events } = useEventContext();

  return (
    <div {...props}>
      <h1>London Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
