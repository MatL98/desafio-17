const Router = require("koa-router")
const { createLogger, format, transports } = require("winston");
const Contenedor = require("../controllers/dao/daoProd");
let products = new Contenedor();
const router = new Router({
  prefix: "/api/productos"
})

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

router.get("/", ctx => {
  const getProd = products.getAll()
  ctx.body = {data: getProd}
});
router.get("/:id", ctx => {
  let id = ctx.params.id;
  const getId = await products.getById(id);
  ctx.body = {data: `El producto con ${id} se encontro ${{ getId }}`};
});

router.post("/", ctx => {
  let { name , price, thumbnail } = ctx.request.body
  const obj = {
    name,
    price,
    thumbnail
  };
  const save = await products.save(obj);
  ctx.request.status(201)
  ctx.body = {data: save}
});
router.put("/:id", ctx => {
  let id = ctx.params.id;
  const updateById = await products.getById(id);
  ctx.response.status(201)
  ctx.body = {data:updateById}
});
router.delete("/:id", ctx => {
  let id = ctx.params.id;
  const deleted = await products.deleteById(id);
  ctx.response.status(201)
  ctx.body = {data: deleted}
});

module.exports = router;
