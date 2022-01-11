const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/ecommerce") 

mongoose.connection.on("open", ()=>{
  console.log("connection successful");
})

mongoose.connection.on("error", ()=>{
  console.log("connection error");
})


