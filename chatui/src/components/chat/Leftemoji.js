import React from "react";

const leftemoji = ({ message }) => {
  return (
    <div className="left-emoji-bubble">
      <div className="l_emoji_message">
        <span className="l_emoji">{message}</span>
      </div>
    </div>
  );
};

export default leftemoji;
