import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";

import App from "./App/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById("root")
);
