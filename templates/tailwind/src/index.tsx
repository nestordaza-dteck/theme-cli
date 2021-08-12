import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "tailwindcss/tailwind.css";
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
