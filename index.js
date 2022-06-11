const express = require('express');
var cors = require('cors');
var routes = require('./routes/routes');
var auth = require('./routes/auth');
const app = express();
const port = process.env.PORT || 3002;
const dotenv = require('dotenv');
const path = require('path');
app.use(cors())
// app.use(express.static("./public"))
dotenv.config();
app.use(express.json())


app.use('/api/v1/routes',routes)
app.use('/api/v1/secure',auth)

// app.use('/api/notes',require('./routes/notes'))

__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/chatui/build')))

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'chatui','build','index.html'))
  })
}
else{
  app.get('/',(req,res)=>{
      res.send("api is running...");
  })
}

const server = app.listen(port,()=>{

    console.log(`Example app listing at https://chat-app90.herokuapp.com/:${port}`);
})

var io = require('socket.io')(server,{
    cors:{
        origin: '*'
    }
});

  io.on("connection",(socket)=>{
    socket.on("setup", (user_id) => {
          socket.join(user_id)
      });
    
  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User Joined Room: " + room);
  });


  socket.on("accpet-message",(recieve_id,sender_id)=>{
    console.log("message recieve",recieve_id,sender_id)
    socket.in(sender_id).emit("accept-message",recieve_id,sender_id);
  })
  socket.on("new-message",(data)=>{
        // console.log("new message",data);
        
        socket.in(data.id).emit("message recieved", data);

  })
  socket.on("typing",(room)=>{
    socket.in(room.id).emit("typing",room.userid)
  })

  socket.on("stop typing", (room) => socket.in(room.id).emit("stop typing",room.userid));


  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(user_id);
  });
  
  })



