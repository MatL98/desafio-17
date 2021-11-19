const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server)


io.on("connection" ,(socket)=>{
  console.log("User connected")
  socket.emit("message", knex("msns"))

socket.on("message-client", (data)=>{
console.log(data)
})
socket.on("new-message", function(data){
console.log(data)
  let msn = {
      email: data.mail,
      message: data.msn
  }
io.sockets.emit("message", msn)
})
})