import React, { useEffect,useState,useRef } from "react";

const LeftBubble = ({ message }) => {

  return (
    <div  className="left-bubble">
      <div className="left_message">
        <span className="left_text">{message}</span>
      </div>
    </div>
  );
};

export default LeftBubble;
