// routes/_index.tsx
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import EventCards from "~/ui/components/eventCard";
import { useSearch } from '~/utils/searchContextProvider'; // Adjust the path
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Vennew - Events" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  // Fetch any data you need for your component here
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  return {
    apiKey: apiKey,
  };
};

export default function Index() {
  const { searchTerm } = useSearch();
  const { apiKey } = useLoaderData<{ apiKey: string }>();

  return (
    <>
      <EventCards searchTerm={searchTerm} apiKey={apiKey} />
    </>
  );
}
