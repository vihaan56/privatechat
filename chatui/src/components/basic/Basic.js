import React,{useState,useEffect} from 'react'

const Basic = () => {

    const [messages,setmessages] = useState([]);
    const [socket,setSocket] = useState(false)
    useEffect(()=>{
      setmessages([{name:"vihaan"}])
      setmessages([...messages,{name:"khushi"}])

    },[])
    useEffect(() => {
       console.log(messages)
    //    setmessages([...messages,{name:"singla"}])
    },[socket])
  return (
    <div>{messages.map((e)=>{
         console.log(e)
    })}</div>
  )
}

export default Basic