import * as React from "react";

// import ImageIcon from '@mui/icons-material/Image';
// import WorkIcon from '@mui/icons-material/Work';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function UserItem({name,user_id}) {
    var param = "/chatbox/"+user_id


  return (

        <>
        <div className="outer-wrapper">
          <a href={param} key={user_id} >
           <div className="useritem">
            <span className="user_image">I</span>
            <span className="user_name">{name}</span>
          </div>
          </a>
        </div>
        </>

  );
}
