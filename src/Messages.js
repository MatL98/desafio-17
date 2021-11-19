const express = require("express")
const http = require("http")
const { msn } = require("./Msns")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server)


io.on("connection" ,(socket)=>{
  console.log("User connected")
  socket.emit("message", msn)

socket.on("message-client", (data)=>{
console.log(data)
})
socket.on("new-message", function(data){
console.log(data)
  let msn = {
      email: data.mail,
      name: data.name,
      lastName: data.lastName,
      age: data.age,
      avatar: data.avatar,
      message: data.msn
  }
io.sockets.emit("message", msn)
})
})