import React from "react";

const leftemoji = ({ message }) => {
  return (
    <div class="left-emoji-bubble">
      <div class="l_emoji_message">
        <span class="l_emoji">{message}</span>
      </div>
    </div>
  );
};

export default leftemoji;
