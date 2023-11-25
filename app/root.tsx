import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Layout from "./ui/components/layout";

// @ts-ignore
import globalStylesheet from "./ui/styles/global.css"
// @ts-ignore
import uiStylesheet from './ui/styles/ui.css';
import { EventProvider } from "./utils/eventProvider";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
    {
      rel: "stylesheet",
      href: globalStylesheet,
    },
    {
      rel: "stylesheet",
      href: uiStylesheet,
    },
  ];
};
export default function App() {
  return (
    <EventProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Layout>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </Layout>
        </body>
      </html>
    </EventProvider>
  );
}
