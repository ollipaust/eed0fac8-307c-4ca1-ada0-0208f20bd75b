// eventSideDrawer.tsx
import React from 'react';

const EventSideDrawer: React.FC<{
  showSideDrawer: boolean;
  selectedEvent: any;
  apiKey: string;
  closeSideDrawer: () => void;
  openGoogleMapsInNewTab: () => void;
}> = ({ showSideDrawer, selectedEvent, apiKey, closeSideDrawer, openGoogleMapsInNewTab }) => {
  return (
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
  );
};

export default EventSideDrawer;
