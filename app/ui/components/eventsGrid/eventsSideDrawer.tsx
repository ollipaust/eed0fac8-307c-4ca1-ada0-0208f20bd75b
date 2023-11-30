import React from "react";

const EventSideDrawer: React.FC<{
  showSideDrawer: boolean;
  selectedEvent: any;
  googleMapsApiKey: string;
  closeSideDrawer: () => void;
  openGoogleMapsInNewTab: () => void;
}> = ({showSideDrawer, selectedEvent, googleMapsApiKey, closeSideDrawer, openGoogleMapsInNewTab}) => {
  const isVisible = showSideDrawer && selectedEvent;

  return (
    <div className={`googleMapsSideDrawer ${isVisible ? "googleMapsSideDrawer--visible" : ""}`}>
      {isVisible && (
        <>
          <iframe
            title={`Google Maps - ${selectedEvent.venue.name}, ${selectedEvent.city}, ${selectedEvent.country}`}
            className="googleMapsSideDrawer__iframe"
            width="100%"
            height="100%"
            style={{border: "0"}}
            src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
              `${selectedEvent.venue.name}, ${selectedEvent.city}, ${selectedEvent.country}`,
            )}&key=${googleMapsApiKey}`}
            allowFullScreen
          />
          <div className="googleMapsSideDrawer--hidden"></div>
        </>
      )}
      {isVisible && (
        <div className="googleMapsSideDrawer__buttonsContainer">
          <button
            className="googleMapsSideDrawer__button btn"
            onClick={closeSideDrawer}
          >
            Close
          </button>
          <button
            className="googleMapsSideDrawer__button btn"
            onClick={openGoogleMapsInNewTab}
          >
            Open in Google Maps
          </button>
        </div>
      )}
    </div>
  );
};

export default EventSideDrawer;
