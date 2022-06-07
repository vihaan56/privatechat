import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import { Navigate } from "react-router-dom";
const DisplayUser = () => {
  const host = "http://localhost:3002";
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
    <div className="container">
      <div className="userbox">
        <div className="style">
          {users.map((user) => {
            return (
              <UserItem user_id={user.user_id} name={user.name}></UserItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayUser;
