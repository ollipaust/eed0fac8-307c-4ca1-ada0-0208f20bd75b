import React, { useState, useEffect } from 'react';

interface Event {
  _id: string;
  title: string;
  flyerFront?: string;
  attending: number;
  date: string;
  startTime: string;
  endTime: string;
  contentUrl: string;
  venue: {
    id: string;
    name: string;
    contentUrl: string;
    live: boolean;
    direction: string;
  };
  pick?: {
    id: string;
    blurb: string;
  };
  artists: {
    id: string;
    name: string;
    _id: {
      $oid: string;
    };
  }[];
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
    const flyerImageWidth = '500px'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://teclead-ventures.github.io/data/london-events.json'
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>London Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p>Attending: {event.attending}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.startTime} - {event.endTime}</p>
            <p>Venue: {event.venue.name}</p>
            {event.pick && <p>Pick Blurb: {event.pick.blurb}</p>}
            <p>Artists: {event.artists.map((artist) => artist.name).join(', ')}</p>
            <img src={event.flyerFront ? event.flyerFront : '/placeholder.png'} alt="Event Flyer" style={{ maxWidth: flyerImageWidth }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
