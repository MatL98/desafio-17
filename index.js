const express = require("express");
const app = express();
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const faker = require("faker");
const PORT = process.env.PORT || 8080;
const routerChat = require("./src/routes/chat")




app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const products = [];
for (let i = 0; i < 5; i++) {
  const product = {
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.technics(),
  };
  products.push(product);
}
app.use("/", routerChat)

app.get("/api/productos-test", (req, res) => {
  res.send(products);
});

io.on("connection" , (socket)=>{
  console.log("User connected")
  socket.emit("message", "")

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

server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
