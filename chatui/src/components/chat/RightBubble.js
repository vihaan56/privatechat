import React, { useEffect,useState,useRef } from "react";
import moment from "moment";

const RightBubble = ({ timestamp,message }) => {
  var time = moment(timestamp).startOf('seconds').fromNow()

  return (
    <div   className="right-bubble">
      <div className="right_message">
        <span className="right_text">{message}</span>
      </div>
      {/* <span className="right_time">{moment(timestamp).startOf('seconds').fromNow()}</span> */}

    </div>
  );
};

export default RightBubble;
