import React, { useState } from 'react';
import { useEventContext } from '../../utils/eventProvider';
import { cropTitle } from '~/utils/cropTitle';
import TimeFormat from '~/utils/formatTime';

const EventList: React.FC = ({ props }: any) => {
  const { events } = useEventContext();

  const ImageComponent = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
    const [imageStatus, setImageStatus] = useState('loading');

    const handleImageError = () => {
      setImageStatus('error');
    };

    return (
      <div>
        {imageStatus === 'loading' && <p>Loading flyer...</p>}
        {imageStatus === 'error' && <p>Error loading flyer</p>}
        {imageStatus === 'success' && <img className="flyerImg" src={imageUrl} alt={alt} />}
        
        <img
          className="flyerImg" 
          src={imageUrl}
          alt={alt}
          onLoad={() => setImageStatus('success')}
          onError={handleImageError}
        />
      </div>
    );
  };

  return (
    <div className="eventsGrid" {...props}>
      {events.map((event, index) => (
        event.flyerFront && (
          <div key={event._id} className={`box box__${index}`}>
            <div className='box__head'>
              <ImageComponent imageUrl={event.flyerFront} alt="Event Flyer" />
            </div>
            <div className='box__body'>
              {cropTitle(event.title)}
            </div>
            <div className='box__foot'>
              <TimeFormat startTime={event.startTime} endTime={event.endTime} fallBackTime={event.date} />
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default EventList;
