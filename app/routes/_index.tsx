import type { MetaFunction } from "@remix-run/node";
import EventList from "~/ui/components/eventList";
import Layout from "~/ui/components/layout";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <Layout>
      <EventList />
    </Layout>
  );
}
