const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app)
const io = require("socket.io")(server)
const PORT = process.env.PORT || 8080;


const routerProd = require("./src/routes/products")
const routerLog = require("./src/routes/login")


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/", routerLog)
app.use("/", routerProd)

//normalizr
const Contenedor = require("./src/dao/daoChat")
const msnSchema = require("./src/Models/MsnSchema")
const { normalize, schema, denormalize } = require("normalizr");


let chat = new Contenedor()

app.get("/chat", (req, res)=>{
  res.sendFile("public/index.html", {root: "."})
})

io.on("connection" , (socket)=>{
  console.log("User connected", socket.id)
  const getChat = chat.getAll().then(res => socket.emit('server:msn', res))
  
  
  socket.on("client:msn", (data)=>{
    chat.save(data)
    const get = chat.getAll()
    get.then(res => socket.emit('server:msn', res))
  })

  /* socket.on("new-message", function(data){
    console.log(data)
    let msn = {
      email: data.mail,
      name: data.name,
      lastName: data.lastName,
      age: data.age,
      avatar: data.avatar,
      message: data.msn
    }
    chat.save(msn)
    io.sockets.emit("message", msn)}) */
})

app.get("/chat", async (req, res)=>{
  const getMns = await chat.getAll()
  const schemaAutor = new schema.Entity('author',{msnSchema}, {idAttribute: 'mail'})
  const mySchema = new schema.Array({
    author: schemaAutor
  })
  const normalizedChat = normalize(getMns[0], mySchema)
  const compressChat = JSON.stringify(normalizedChat).length
  const denormalizeChat = denormalize(normalizedChat.result, mySchema, normalizedChat.entities)
  const descompressChat = JSON.stringify(denormalizeChat).length
  console.log(compressChat, descompressChat);
  const compress = ((compressChat*100)/descompressChat)
  const totalCompress = (compress - 100).toFixed(2)
  
  //res.send({normalizr: normalizedChat, porcentajeCompresion: `% ${totalCompress}`})
  
})


server.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
})
