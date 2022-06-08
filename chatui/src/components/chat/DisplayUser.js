import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import { Navigate } from "react-router-dom";
const DisplayUser = () => {
  const host = "https://chat-app90.herokuapp.com";
var userid;
  const [users, setusers] = useState([]);
const [flag,setflag] = useState(false)
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
      userid = localStorage.getItem("userid")
      getcompanies();

    }
 else{
        setflag(true)
 }
  }, []);

  if(flag){
    return <Navigate to="/login"></Navigate>
  }

  return (

<div>
<div class="chatbox-container">

    <div class="full-container">
      <div class="main-1">

        <div class="main1-chat_top_container">Users</div>
        <div class="main1-usertopcontainer">
          <div class="main-displayusers">
          {users.map((user) => {
            return (
              <UserItem user_id={user.user_id} name={user.name}></UserItem>
            );
          })}
            

          </div>
        </div>



      </div>
      <div style={{display:"none"}} class="main-2">
        <div class="chatbox">
          <div class="chat_top_container">vihu singla</div>
          <div id="chat_contain" class="chat_container">
            <div class="left-bubble">
              <div class="left_message">
                <span class="left_text">vihaan singla is a good programmer vihaan singla is a good programmer</span>
              </div>
            </div>

            <div class="right-bubble">
              <div class="right_message">
                <span class="right_text">vihaan singla is a good programmer vihaan singla is a good programmer vihaan
                  singla is a good programmer vihaan singla is a good programmervihaan singla is a good programmervihaan
                  singla is a good programmervihaan singla is a good programmer
                  justifyjustifyjustifyjustifyjustify</span>
              </div>
            </div>
            <div class="right-bubble">
              <div class="right_message">
                <span class="right_text">vihaan singla is a good programmer vihaan singla is a good programmer vihaan
                  singla is a good programmer vihaan singla is a good programmervihaan singla is a good programmervihaan
                  singla is a good programmervihaan singla is a good programmer
                  justifyjustifyjustifyjustifyjustify</span>
              </div>
            </div>
            <div class="right-bubble">
              <div class="right_message">
                <span class="right_text">Pet ch v gas je bni pai ae neend ni ani hale</span>
              </div>
            </div>

            {/* <!-- <div class="typing-bubble">
            <div class="typing">Typing...</div>
          </div> --> */}
          </div>

          <div class="textarea_container">
            <div class="txt-mid">
              <div class="textarea">
                <textarea id="textarea" autoCorrect="off" autoCapitalize="off" spellCheck="false" class="textarea"
                  placeholder="Message..." rows="1"></textarea>
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

export default DisplayUser;
