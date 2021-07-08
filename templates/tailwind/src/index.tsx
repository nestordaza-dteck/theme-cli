import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/styles/index.scss";
import { renderDataToDOM } from "./helpers/helpers";

const open = process.env.NODE_ENV === "development" ? render : hydrate;
const global = renderDataToDOM();

const basename = window.location.hostname.includes("builder.mysoltivo")
  ? `/themes/${process.env.THEME_ID}`
  : "/";

open(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App global={global} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
