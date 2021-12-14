const express = require("express")
const { Router } = express;
const router = new Router();
const faker = require("faker");
const Contenedor = require("../dao/daoProd")


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


    const getProd = await product.getAll()
    res.send(getProd);
  });


module.exports = router
