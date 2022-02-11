const express = require("express");
const { Router } = express;
const router = new Router();
const { createLogger, format, transports } = require("winston");
const Contenedor = require("../controllers/dao/daoProd");
let products = new Contenedor();

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

router.get("/", async (req, res) => {
  const getProd = await products.getAll()
  res.json(getProd);
});
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const getId = await products.getById(id);
  res.send(`El producto con ${id} se encontro ${{ getId }}`);
});

router.post("/", async (req, res) => {
  let { name , price, thumbnail } = req.body;
  const obj = {
    name,
    price,
    thumbnail
  };
  const save = await products.save(obj);

  res.status(201).send(save);
});
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  const updateById = await products.getById(id);
  res.status(201).send(updateById);
});
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  const deleted = await products.deleteById(id);
  res.send(deleted);
});

module.exports = router;
