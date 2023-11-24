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

import globalStylesheet from "~/ui/styles/global.css"
import headerStylesheet from "~/ui/styles/header.css"
import mainContentStylesheet from "~/ui/styles/mainContent.css"
import footerStylesheet from "~/ui/styles/footer.css"

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
      href: headerStylesheet,
    },
    {
      rel: "stylesheet",
      href: mainContentStylesheet,
    },
    {
      rel: "stylesheet",
      href: footerStylesheet,
    },
  ];
};
export default function App() {
  return (
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
  );
}
