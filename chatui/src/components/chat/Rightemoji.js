import React from 'react'

const Rightemoji = ({message}) => {
  return (
    <div className="right-emoji-bubble">
    <div className="r_emoji_message">
    <span className="r_emoji">{message}</span>
    </div>
  </div>
  )
}

export default Rightemoji