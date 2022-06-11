import "./styles/chatbox.css";
import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Navigate, useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import LeftBubble from "./LeftBubble";
import RightBubble from "./RightBubble";
import Leftemoji from "./Leftemoji";
import Rightemoji from "./Rightemoji";
// import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import io from "socket.io-client";
const host = "https://chat-app90.herokuapp.com";
//https://chat-app90.herokuapp.com
var socket;

socket = io(host);

const Chatbox = () => {
  const [messages, setmessages] = useState([]);
  const { id } = useParams();
  // const [loading, setLoading] = useState(true);
  // const [selectchat, setselectchat] = useState(true);
  const [flag, setflag] = useState(false);
  const messagesEndRef = useRef(null);
  const [seen, setseen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [name,setname] = useState("");
  var userid,
    timeout = undefined;

  var emoji_regex =
    /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  if (localStorage.getItem("userid") != null) {
    userid = localStorage.getItem("userid");
  }

  const getchat = async () => {
    // setLoading(true);
    const response = await fetch(`${host}/api/v1/routes/fetchchat`, {
      method: "POST",
      origin: true,
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ user_id: userid, r_id: id }),
    });

    const json = await response.json();
    setmessages(json);
    // setLoading(false);
    socket.emit("join chat", id);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollToBottom();
  };
  //  getcompanies()

  const getname = async ()=> {


    const response = await fetch(`${host}/api/v1/routes/usersdata`, {
      method: "POST",
      origin: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: id }),
    });
    const json = await response.json();
    setname(json[0].name);
  }
  useEffect( () => {
    

    if (localStorage.getItem("token") == null) {
      setflag(true);
    } else {
      userid = localStorage.getItem("userid");
      socket.emit("setup", userid);
      getname();
      getchat();
    }
  }, []);

  useEffect(() => {
    socket.on("typing", (uid) => {
      if (parseInt(uid) === parseInt(id)) {
        // setTyping(true)
        setIsTyping(true);
      }
    });
    socket.on("stop typing", (uid) => {
      if (parseInt(uid) === parseInt(id)) {
        // setTyping(false);
        setIsTyping(false);
      }
    });

    socket.on("accept-message", (r_id, s_id) => {
      setseen(true);
    });
    socket.on("message recieved", (data) => {
      setseen(false);
      if (
        parseInt(data.id) === parseInt(userid) &&
        parseInt(data.json[0].sender) === parseInt(id)
      ) {
        setmessages((messages) => [...messages, data.json[0]]);
        socket.emit("accpet-message", data.json[0].sender, userid);
      }
    });
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollToBottom();
  }, [messages]);

  if (flag) {
    return <Navigate to="/login"></Navigate>;
  }
  const sendmessage = async (e) => {
    setseen(false);
    document.getElementById("textarea").focus();
    e.preventDefault();
    var message = e.target[0].value;
    if (message === "") return;
    e.target[0].value = "";
    socket.emit("stop typing", { id, userid });
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
  };
  function timeoutfunction() {
    setTyping(false);
    socket.emit("stop typing", { id, userid });
  }
  const _handleKeyDown = async (e) => {
    if (!typing) {
      setTyping(true);
      socket.emit("typing", { id, userid });
      timeout = setTimeout(timeoutfunction, 5000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutfunction, 5000);
    }

    if (e.key === "Enter") {
      setseen(false);
      socket.emit("stop typing", { id, userid });
      var message = e.target.value;
      message = message.trim();
      if (message === "") {
        return;
      }

      e.target.value = "";

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
      <div className="chatbox-container">
        <div className="full-container">
          <div style={{ display: "none" }} className="main-1">
            <div className="main1-chat_top_container">Vihaan Singla</div>
            <div className="main1-usertopcontainer">
              <div className="main-displayusers"></div>
            </div>
          </div>
          <div className="main-2">
            <div className="chatbox">
              <div className="chat_top_container">{name}</div>
              <div id="chat_contain" className="chat_container">
                {/* {
                     loading?"Loading....":""
                   } */}

                <ScrollableFeed ref={messagesEndRef}>
                  {messages &&
                    messages.map((message) => {
                      var flag = emoji_regex.test(message.content);
                      return parseInt(message.sender) === parseInt(id) ? (
                        flag ? (
                          <Rightemoji message={message.content}></Rightemoji>
                        ) : (
                          <RightBubble message={message.content}></RightBubble>
                        )
                      ) : flag ? (
                        <Leftemoji message={message.content}></Leftemoji>
                      ) : (
                        <LeftBubble message={message.content}></LeftBubble>
                      );
                    })}

                  {seen ? (
                    <div className="seen_s">
                      <div className="seen">Seen</div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="typing">{istyping ? "Typing..." : ""}</div>
                </ScrollableFeed>

                {/* <ScrollableChat messages={messages} id={id}></ScrollableChat> */}
              </div>
              <form onSubmit={sendmessage}>
                <div className="textarea_container">
                  <div className="txt-mid">
                    <div className="textarea">
                      <textarea
                        id="textarea"
                        r_id={id}
                        autoFocus
                        onKeyDown={_handleKeyDown}
                        autoCapitalize="off"
                        className="textarea"
                        placeholder="Message..."
                        rows="1"
                      ></textarea>
                    </div>
                    <div className="send_button">
                      <button type="submit" id="send" className="submit">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
