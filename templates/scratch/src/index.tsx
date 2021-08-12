import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/styles/index.scss";
import { open } from "@soltivo/theme-library";

open((data, render, { basename }) => {
  render(
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <App global={data} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
