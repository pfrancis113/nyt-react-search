import React from "react";
import "./MessageDiv.css";

const MessageDiv = props => {
   return (   <div className="no-articles-message">
            {props.message}
        </div>
    )
};

export default MessageDiv