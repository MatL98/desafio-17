const express = require("express");
const app = require("../../App")
const http = require("http");
//Server io
const server = http.createServer(app);
const io = require("socket.io")(server);


// normalizr
const Contenedor = require("../dao/daoChat");
const msnSchema = require("../Models/MsnSchema");
const { normalize, schema, denormalize } = require("normalizr");

const { Router } = express;
const router = new Router();

let chat = new Contenedor();

// socket connection
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  const getChat = chat.getAll().then((res) => socket.emit("server:msn", res));

  socket.on("client:msn", (data) => {
    chat.save(data);
    const get = chat.getAll();
    get.then((res) => socket.emit("server:msn", res));
  });
});

// route mount
router.get("/chat", (req, res) => {
  /* passport.deserializeUser((user, done)=>{
    //let users = users.getUser(user)
    done(null, user.username)
  }) */
});

router.get("/chatNormalizr", async (req, res) => {
  const getMns = await chat.getAll();
  const schemaAutor = new schema.Entity(
    "author",
    { msnSchema },
    { idAttribute: "mail" }
  );

  // Normalize data
  const mySchema = new schema.Array({
    author: schemaAutor,
  });
  const normalizedChat = normalize(getMns[0], mySchema);
  const compressChat = JSON.stringify(normalizedChat).length;
  const denormalizeChat = denormalize(
    normalizedChat.result,
    mySchema,
    normalizedChat.entities
  );
  const descompressChat = JSON.stringify(denormalizeChat).length;
  console.log(compressChat, descompressChat);
  const compress = (compressChat * 100) / descompressChat;
  const totalCompress = (compress - 100).toFixed(2);

  res.send({
    normalizr: normalizedChat,
    porcentajeCompresion: `% ${totalCompress}`,
  });
});

module.exports = router