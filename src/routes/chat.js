const express = require("express")
const { Router } = express;
const router = new Router();
const Contenedor = require("../dao/daoChat")
const { normalize, schema, denormalize } = require("normalizr");



let chat = new Contenedor;
//Routes
router.get("/api/mensajes", (req, res) => {
  res.sendFile("/public/index.html", { root: "." });
});

router.get("/mensajes", async (req, res)=>{
  const getMns = await chat.getAll()
  const schemaAutor = new schema.Entity('author')
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

  res.send({normalizr: normalizedChat, porcentajeCompresion: `% ${totalCompress}`})
})


router.post("/api/mensajes", async (req, res)=>{
  console.log(req.body);
  const mensaje = {
    author:{
      mail: req.body.mail,
      name: req.body.name,
      lastName: req.body.lastName,
      age: req.body.age,
      alias: req.body.alias,
      avatar: req.body.avatar,
    },
    msn: req.body.message
  }
  const saveMensajes = await chat.save(mensaje)
  res.send(saveMensajes)
})



module.exports = router