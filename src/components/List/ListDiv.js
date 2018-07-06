import React from "react";
import "./ListDiv.css";

const ListDiv = (props) => {
   
    const formattedDate = new Date(props.pub_date)
    const month = (formattedDate.getMonth());
    const date = formattedDate.getDate();
    const year = formattedDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  return (

    <div className = "listDiv">
        <h4 className="article-header">{props.headline}</h4>
        <p className="article-byline">{props.byline}</p>
        <p className="article-date"><b>Published:</b> {monthNames[month]} {date}, {year}</p>
        <p className="article-snippet"><b>Snippet:</b> {props.snippet}</p>
    </div>
);
}

export default ListDiv;