import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import LeftBubble from "./LeftBubble";
import RightBubble from "./RightBubble";
import DisplayUser from "./DisplayUser";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
const host = "https://chat-app90.herokuapp.com";

var socket;

socket = io(host);

const Chatbox = () => {
  const [messages, setmessages] = useState([]);

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectchat, setselectchat] = useState(true);
  const [flag, setflag] = useState(false);
  const messagesEndRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  var userid;
  if (localStorage.getItem("userid") != null) {
    userid = localStorage.getItem("userid");
  }

  const getcompanies = async () => {
    const response = await fetch(`${host}/api/v1/routes/fetchchat`, {
      method: "POST",
      origin: true,
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ user_id: userid, r_id: id }),
    });

    const json = await response.json();
    console.log("data",json)
    setmessages(json);
    setLoading(false);
    socket.emit("join chat", id);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  //  getcompanies()
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setflag(true);
    } else {
      userid = localStorage.getItem("userid");
      socket.emit("setup", userid);
      socket.on("typing", (uid) => {
        if (uid == id) setIsTyping(true);
      });
      socket.on("stop typing", (uid) => {
        if (uid == id) setIsTyping(false);
      });
      getcompanies();
    }
  }, []);

  useEffect(() => {
    socket.on("message recieved", (data) => {
      if (data.id == userid && data.json[0].sender == id) {
        setmessages((messages) => [...messages, data.json[0]]);
      }
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (flag) {
    return <Navigate to="/login"></Navigate>;
  }

  const _handleKeyDown = async (e) => {
    if (!typing) {
      setTyping(true);
      socket.emit("typing", { id, userid });
    } else {
      let lastTypingTime = new Date().getTime();
      var timerLength = 2000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          socket.emit("stop typing", { id, userid });
          setTyping(false);
        }
      }, timerLength);
    }

    if (e.key === "Enter") {
      socket.emit("stop typing", { id, userid });

      var message = e.target.value;
      const response = await fetch(`${host}/api/v1/routes/sendmessage`, {
        method: "POST",
        origin: true,
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ user_id: userid, r_id: id, message: message }),
      });

      const json = await response.json();
      e.target.value = "";

      setmessages((messages) => [...messages, json[0]]);
      var data = { json, id };
      socket.emit("new-message", data);
    }
  };

  return (
    <div>
      <div class="chatbox-container">
        <div class="full-container">
          <div style={{display:"none"}} class="main-1">
            <div class="main1-chat_top_container">Vihaan Singla</div>
            <div class="main1-usertopcontainer">
              <div class="main-displayusers">
                <div class="user">
                  <div class="user-items">
                    <div class="image">
                      <span class="image-span">
                        <img alt="#" class="user-image" src="./pic.jpg" />
                      </span>
                    </div>
                    <div class="username">
                      <div class="username-flex">
                        <div class="name">vihaan singla</div>
                        <div class="last-message">This is last message</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user">
                  <div class="user-items">
                    <div class="image">
                      <span class="image-span">
                        <img alt="#" class="user-image" src="./pic.jpg" />
                      </span>
                    </div>
                    <div class="username">
                      <div class="username-flex">
                        <div class="name">vihaan singla</div>
                        <div class="last-message">This is last message</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="user">
                  <div class="user-items">
                    <div class="image">
                      <span class="image-span">
                        <img alt="#" class="user-image" src="./pic.jpg" />
                      </span>
                    </div>
                    <div class="username">
                      <div class="username-flex">
                        <div class="name">vihaan singla</div>
                        <div class="last-message">This is last message</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="user">
                  <div class="user-items">
                    <div class="image">
                      <span class="image-span">
                        <img alt="#" class="user-image" src="./pic.jpg" />
                      </span>
                    </div>
                    <div class="username">
                      <div class="username-flex">
                        <div class="name">vihaan singla</div>
                        <div class="last-message">This is last message</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="user">
                  <div class="user-items">
                    <div class="image">
                      <span class="image-span">
                        <img alt="#" class="user-image" src="./pic.jpg" />
                      </span>
                    </div>
                    <div class="username">
                      <div class="username-flex">
                        <div class="name">vihaan singla</div>
                        <div class="last-message">This is last message</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="user">
                  <div class="user-items">
                    <div class="image">
                      <span class="image-span">
                        <img alt="#" class="user-image" src="./pic.jpg" />
                      </span>
                    </div>
                    <div class="username">
                      <div class="username-flex">
                        <div class="name">vihaan singla</div>
                        <div class="last-message">This is last message</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="user">
                  <div class="user-items">
                    <div class="image">
                      <span class="image-span">
                        <img alt="#" class="user-image" src="./pic.jpg" />
                      </span>
                    </div>
                    <div class="username">
                      <div class="username-flex">
                        <div class="name">vihaan singla</div>
                        <div class="last-message">This is last message</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-2">
            <div class="chatbox">
              <div class="chat_top_container">Chat Box</div>
              <div id="chat_contain" class="chat_container">
                  <ScrollableChat messages={messages} id={id}></ScrollableChat>

                {/* <div class="typing-bubble">
        <div class="typing">Typing...</div>
      </div>  */}
              </div>

              <div class="textarea_container">
                <div class="txt-mid">
                  <div class="textarea">
                    <textarea
                      id="textarea"
                      r_id={id}
                      onKeyDown={_handleKeyDown}
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      class="textarea"
                      placeholder="Message..."
                      rows="1"
                    ></textarea>
                  </div>
                  <div class="send_button">
                    <button type="button" id="send" class="submit">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Chatbox;
