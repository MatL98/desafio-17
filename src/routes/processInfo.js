const express = require("express");


const { Router } = express;
const router = new Router();

router.get("/", (req, res)=>{
    const processObj = {
        Directorio: process.cwd(),
        Sistema: process.platform,
        Node: process.version,
        MemoriaRSS: process.memoryUsage(),
        ProcessId: process.pid
    }
    let info = processObj
    res.send(info)
})


module.exports = router;
