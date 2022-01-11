const express = require("express")
const { Router } = express;
const router = new Router();
const faker = require("faker");
const Contenedor = require("../dao/daoProd")
const {createLogger, format, transports} = require("winston")


const logger = createLogger({
  transports:[
    new transports.File({
      filename: "error.log",
      level: "error"
    })
  ]
})

let product = new Contenedor;

  router.get("/", async (req, res) => {
    for (let i = 0; i < 5; i++) {
      const products = {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.technics(),
      };
    await product.save(products)
    }

    try {
      const getProd = await product.getAll()
      res.send(getProd);
    } catch (error) {
      logger.log("error", error)
    }
    
  });


module.exports = router
