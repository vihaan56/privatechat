import React from 'react'
import moment from "moment";;

const Rightemoji = ({timestamp,message}) => {
  return (
    <div className="right-emoji-bubble">
    <div className="r_emoji_message">
    <span className="r_emoji">{message}</span>
    </div>
    {/* <span className="right_time">{moment(timestamp).startOf('seconds').fromNow()}</span> */}

  </div>
  )
}

export default Rightemoji