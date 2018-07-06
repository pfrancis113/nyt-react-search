import React from "react";
import "./Panel.css";

const Panel = props => (
  <div className="panel panel-default text-center">
    <div className="panel-heading">
      <h2>{props.heading}</h2>
    </div>
    <div className="panel-body">{props.children}</div>
  </div>
);

export default Panel;