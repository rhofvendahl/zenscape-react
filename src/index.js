import React from "react";
import ReactDOM from "react-dom";
import Background from "./Background";
import ScapeManager from "./ScapeManager";
import "./index.css";

ReactDOM.render((
  <React.Fragment>
    <Background />
    <ScapeManager />,
  </React.Fragment>
), document.getElementById("root"));
