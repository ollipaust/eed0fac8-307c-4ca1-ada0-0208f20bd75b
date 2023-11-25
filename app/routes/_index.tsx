// routes/_index.tsx
import type { MetaFunction } from "@remix-run/node";
import EventList from "~/ui/components/eventList";
import { useSearch } from '~/utils/searchContextProvider'; // Adjust the path

export const meta: MetaFunction = () => {
  return [
    { title: "Vennew - Events" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { searchTerm } = useSearch();

  return (
    <>
      <EventList searchTerm={searchTerm} />
    </>
  );
}
