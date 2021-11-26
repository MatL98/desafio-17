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

//MongoAtlas - Configuracion Sesion
const MongoStore = require("connect-mongo")
const session = require("express-session")
const advanceOptions = {useNewUrlparser: true, useUnifiedTopology: true}

app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://mat:fury8gb@cluster0.fpnkj.mongodb.net/ecommerce?retryWrites=true&w=majority",
    mongoOptions: advanceOptions
  }),
  secret: "topSecret",
  resave: true,
  saveUninitialized: true
}))

app.get("/login", (req, res) => {
  res.sendFile("/public/login/formSession.html", { root: "." });
  const user = req.query.name;
  console.log(user);
  req.session.users = user
  console.log(req.session);
});


app.get("/logout", (req, res) => {
  req.session.destroy((err)=>{
    if (err) {
      res.send("hay un error")
    } else {
      res.send(`Hasta luego ${req.session.users}`)
      function logout() {
        res.redirect("/login")
        return
      }
      setTimeout(logout, 3000);
    }
  })
  res.send("ok")
});

server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
