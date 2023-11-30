import React from "react";
import ImageLoader from "~/utils/imageLoader";
import { SvgCartIconPlus } from "~/ui/constants/svg/cartSvg";
import { SvgPinIcon } from "~/ui/constants/svg/pinSvg";
import TimeFormat from "~/utils/formatDateAndTime";
import { useShoppingCartContext } from "~/utils/appContextProvider";

const EventBoxes: React.FC<{
  event: any;
  index: number;
  selectedEvent: any | null;
  handleCartIconClick: (event: any, title: string) => void;
  openGoogleMapsInNewTab: (event: any) => void;
}> = React.memo(
  ({ event, index, selectedEvent, handleCartIconClick, openGoogleMapsInNewTab }) => {
    const { addToCart, shopCart, maxCartItemsSelected } = useShoppingCartContext();
    const isAddToCartDisabled = shopCart.length >= maxCartItemsSelected;

    return (
      <div id={`EventsCardBox__${index}`} key={`${event._id}`} className={`eventsCardBox eventsCardBox__${index}`}>
        <div className="eventsCardBox__head">
          <ImageLoader imageUrl={event.flyerFront} alt="Event Flyer" />
          <div className="svgCartIcon__container">
            <SvgCartIconPlus
              svgCartType={"plus"}
              width={48}
              height={48}
              onClick={() => {
                if (!isAddToCartDisabled) {
                  addToCart(event);
                }
              }}
              className={isAddToCartDisabled ? "disabled" : ""}
            />
          </div>
        </div>
        <div className="eventsCardBox__body">
          <p>{event.title}</p>
        </div>
        <div className="eventsCardBox__foot">
          <p className="eventLocation">
            <SvgPinIcon className="full" width={16} height={16} />
            <strong>
              <a
                className={`eventLocation__venue--${selectedEvent === event ? "active" : ""}`}
                onClick={() => openGoogleMapsInNewTab(event)}
                role="button"
                tabIndex={0}
                aria-label={`View location details for ${event.venue.name}`}
              >
                {event.venue.name}
              </a>
            </strong>
          </p>
          <p className="eventDate">
            <TimeFormat startTime={event.startTime} endTime={event.endTime} fallBackTime={event.date} />
          </p>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.event === nextProps.event;
  },
);

export default EventBoxes;
