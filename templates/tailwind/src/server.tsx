import React from "react";
import { StaticRouter } from "react-router";
import { renderToString } from "react-dom/server";
import App from "./app";

export default function SSR(global: WebsiteData, path: string) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={path}>
        <App global={global} />
      </StaticRouter>
    </React.StrictMode>
  );
}
