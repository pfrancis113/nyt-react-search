import React from "react";
import "./ListItem.css";

const ListItem = props => (
  <li className="list-group-item">
  <div className="listParentDiv">
    {props.children}
    </div>
  </li>
);

export default ListItem;