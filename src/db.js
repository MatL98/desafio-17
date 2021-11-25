const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce") 

mongoose.connection.on("open", ()=>{
  console.log("connection successful");
})

mongoose.connection.on("error", ()=>{
  console.log("connection error");
})


