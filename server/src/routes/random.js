/* const Router = require("koa-router")

const { fork } = require("child_process")

const router = new Router({
  prefix: "/api/random"
})

router.get("/", ctx =>{
  const numbers = ctx.request.cant
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
