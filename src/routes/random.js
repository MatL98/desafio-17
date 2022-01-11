/* const express = require("express");

const { fork } = require("child_process")

const { Router } = express;
const router = new Router();


router.get("/api/random", (req, res)=>{
  const numbers = req.query.cant
  let getNum = 0
  if(numbers){
    getNum.send(numbers)
  }else{
    getNum.send(0)
  }
  getNum.on("message", (random)=>{
    res.send({claves: random})
  })
  logger.log("info", "numero enviado")
}) 



module.exports = router */
