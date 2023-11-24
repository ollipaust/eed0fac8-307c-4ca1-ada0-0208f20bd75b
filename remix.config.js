import { config } from "@netlify/remix-adapter";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  ...(process.env.NODE_ENV === "production" ? config : undefined),
  // appDirectory: "app",
  // Add the buildOptions configuration
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
