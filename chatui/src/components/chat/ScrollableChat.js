import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import LeftBubble from "./LeftBubble";
import RightBubble from "./RightBubble";
const ScrollableChat = ({ messages,id }) => {
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message) => {
          return message.sender == id ? (
            <RightBubble message={message.content}></RightBubble>
          ) : (
            <LeftBubble message={message.content}></LeftBubble>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
