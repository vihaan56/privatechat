import React from "react"
import moment from "moment";

const leftemoji = ({ timestamp,message }) => {
  return (
    <div className="left-emoji-bubble">
      <div className="l_emoji_message">
        <span className="l_emoji">{message}</span>
      </div>
      {/* <span className="left_time">{moment(timestamp).startOf('seconds').fromNow()}</span> */}
    </div>
  );
};

export default leftemoji;
