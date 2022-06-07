import React, { useEffect,useState,useRef } from "react";

const RightBubble = ({ message }) => {
  return (
    <div   className="right-bubble">
      <div className="right_message">
        <span className="right_text">{message}</span>
      </div>
    </div>
  );
};

export default RightBubble;
