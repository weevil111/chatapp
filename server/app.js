const express = require("express");
const {Server} = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app)
const io = new Server(server);

app.use(express.static("./public"));
app.use(express.json());

let userList = []; // List of online user

io.on("connection", function(socket){
  console.log(socket.id + " connected !!!");

  socket.on("userConnected", function(username){
    let userObject = {id: socket.id, username}
    userList.push(userObject);
    console.log(userList);
    // for self
    socket.emit("online-list", userList);
    socket.broadcast.emit("join", userObject);
  })
  socket.on("chat",function(chatObj){
    socket.broadcast.emit("chatLeft", chatObj);
  })
  socket.on("disconnect", function() {
    let leftUserObject;
    let remainngUsers = userList.filter(function(userObj){
      if(userObj.id == socket.id){
        leftUserObject = userObj;
        return false;
      }
      return true;
    })
    userList = remainngUsers;
    
    socket.broadcast.emit("leave", leftUserObject);
  })
})

app.get("/", function(req, res){
  console.log(req);
})

server.listen(3000, function(){
  console.log("Server started at port 3000");
})