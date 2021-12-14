/* const express = require("express");

const { fork } = require("child_process")

const { Router } = express;
const router = new Router();


router.get("/", (req, res)=>{
    const numbers = req.query.cant
    let getNum = fork("../getRandom.js")
    getNum.send("start")
    getNum.on("message", (random)=>{
        let clave = {
            claves: random
        }
        res.send(clave)
    })
})




module.exports = router */