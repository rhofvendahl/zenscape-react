import React from "react";
import ReactDOM from "react-dom";
import Background from "./Background";
import ScapeManager from "./ScapeManager";
import "./index.css";

ReactDOM.render((
  <React.StrictMode>
    <Background />
    <ScapeManager />,
  </React.StrictMode>
), document.getElementById("root"));
