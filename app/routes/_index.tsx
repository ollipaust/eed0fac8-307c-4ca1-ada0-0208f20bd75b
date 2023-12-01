import type {MetaFunction, LoaderFunction} from "@remix-run/node";
import EventsGridComponent from "~/ui/components/eventsGrid/eventsGrid";
import { useLoaderData } from "@remix-run/react";
import { useEventContext } from "~/utils/appContextProvider";

export const meta: MetaFunction = () => {
  return [{title: "Vennew - Events"}, {name: "description", content: "Welcome to Remix!"}];
};

export const loader: LoaderFunction = async () => {
  const apiKeyEnvironmentVar = process.env.GOOGLE_MAPS_API_KEY;

  return {
    googleMapsApiKey: apiKeyEnvironmentVar,
  };
};

export default function Index() {
  const {googleMapsApiKey} = useLoaderData<{googleMapsApiKey: string}>();
  const { loading } = useEventContext();
  console.log(typeof googleMapsApiKey)

  return ( 
    <>
      <EventsGridComponent googleMapsApiKey={googleMapsApiKey as string} />
    </>
  );
}
