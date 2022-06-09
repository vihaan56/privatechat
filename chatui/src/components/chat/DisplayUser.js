// import './styles/displayuser.css'
import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import { Navigate } from "react-router-dom";
const DisplayUser = () => {
  const host = "http://192.168.121.224:3002";
  var userid;
  const [users, setusers] = useState([]);
  const [flag, setflag] = useState(false);
  const getcompanies = async () => {
    const response = await fetch(`${host}/api/v1/routes/getallusers`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin

      origin: true, // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ user_id: userid }),
    });

    const json = await response.json();

    setusers(json);
  };

  useEffect(() => {
    if (localStorage.getItem("userid") != null) {
      userid = localStorage.getItem("userid");

      getcompanies();
    } else {
      setflag(true);
    }
  }, []);

  if (flag) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <div>
      <div className="chatbox-container">
        <div className="full-container">
          <div className="main-1">
            <div className="main1-chat_top_container">Users</div>
            <div className="main1-usertopcontainer">
              <div className="main-displayusers">
                {users.map((user) => {
                  return (
                    <UserItem
                      user_id={user.user_id}
                      name={user.name}
                    ></UserItem>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{display:"none"}} className="main-2">
            <div className="chatbox">
              <div className="chat_top_container">vihu singla</div>
              <div id="chat_contain" className="chat_container">
                <div className="left-bubble">
                  <div className="left_message">
                    <span className="left_text">
                      vihaan singla is a good programmer vihaan singla is a good
                      programmer
                    </span>
                  </div>
                </div>

                <div className="right-bubble">
                  <div className="right_message">
                    <span className="right_text">
                      vihaan singla is a good programmer vihaan singla is a good
                      programmer vihaan singla is a good programmer vihaan
                      singla is a good programmervihaan singla is a good
                      programmervihaan singla is a good programmervihaan singla
                      is a good programmer justifyjustifyjustifyjustifyjustify
                    </span>
                  </div>
                </div>
                <div className="right-bubble">
                  <div className="right_message">
                    <span className="right_text">
                      vihaan singla is a good programmer vihaan singla is a good
                      programmer vihaan singla is a good programmer vihaan
                      singla is a good programmervihaan singla is a good
                      programmervihaan singla is a good programmervihaan singla
                      is a good programmer justifyjustifyjustifyjustifyjustify
                    </span>
                  </div>
                </div>
                <div className="right-bubble">
                  <div className="right_message">
                    <span className="right_text">
                      Pet ch v gas je bni pai ae neend ni ani hale
                    </span>
                  </div>
                </div>

                {/* <!-- <div className="typing-bubble">
            <div className="typing">Typing...</div>
          </div> --> */}
              </div>

              <div className="textarea_container">
                <div className="txt-mid">
                  <div className="textarea">
                    <textarea
                      id="textarea"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      className="textarea"
                      placeholder="Message..."
                      rows="1"
                    ></textarea>
                  </div>
                  <div className="send_button">
                    <button type="button" id="send" className="submit">
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

export default DisplayUser;
