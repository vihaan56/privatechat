import './auth.css'
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const host = "https://chat-app90.herokuapp.com";
  const [username,setusername] =useState("");
  const [password,setpassword] =useState("");
  const [loading,setLoading]  = useState(false);
  const [flag,setflag] = useState(false)
  useEffect(()=>{
    if (localStorage.getItem("token") != null) {
      const authaxios = axios.create({
        baseURL: host,
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const headers = {
        auth: localStorage.getItem("token"),
      };
      authaxios
        .post(`${host}/api/v1/secure/checktoken`, {
          headers: headers,
        })
        .then((response) => {
          if (response.data.status === "success") {
            //  history.push("/")
            setflag(true);
          }
        })
        .catch((response) => {
          console.log(response);
        });
    }
  
  })
  if(flag){
    return <Navigate to="/displayuser"></Navigate>
  }
   const handlesubmit = async(e)=>{
         e.preventDefault();
         setLoading(true);
        var username = e.target[0].value;
        var password = e.target[1].value;
        const response = await fetch(`${host}/api/v1/secure/login`, {
          method: "POST", 
          origin: true, 
          headers: {
            "Content-Type": "application/json",
          },
    
          body: JSON.stringify({ username:username,password:password}),
        });
    
        const json = await response.json();
        setLoading(false);
        if(json.status === "success"){
          localStorage.setItem("token", json.authtoken);
          localStorage.setItem("userid", json.userid);
        }
        }
  return (
//     <div >
// <form onSubmit={handlesubmit}>
//       <input type="text" name="username"  placeholder="Username" value={username} onChange={(e)=>setusername(e.target.value)} ></input>
//       <input type="password" name="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)} ></input>

//        <input type="submit" name="submit" value="submit"></input>
// </form>
//     </div>


<section className="form">
<div className="form-signin">
    <form className="form-container" onSubmit={handlesubmit}>
        <div className="heading-container">
            <h1 className="h4 mb-3 fw-normal">Login</h1>
        </div>
        <div className="form-container">
            <div className="status"></div>
            <div className="form-floating my-2">
                <input type="text" className="form-control" name="username" id="username"
                     placeholder="username" value={username} onChange={(e)=>setusername(e.target.value)} />
                <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating my-2">
                <input type="password" className="form-control" name="password" id="password"
                    placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button id="button" className="w-100 btn btn-lg btn-primary my-2" type="submit">
              {loading?"Loading...":"Login"}  
            </button>
        </div>
    </form>

    <div className="login-footer">
        Create a new account?
        <a className="login-link" href="#" data-purpose="login-link-signup-popup">
            Sign in
        </a>
    </div>
</div>

</section>


  )
}

export default Login