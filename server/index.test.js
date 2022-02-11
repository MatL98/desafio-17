const Prod = require("./src/controllers/dao/daoProd");

const assert = require("assert");

describe("test for prod", () => {
  it("Deberia traer la cantidad de productos", async () => {
    const prods = new Prod();
    assert.strictEqual((await prods.getAll()).length, 52);
  });

  it("Deberia agregar productos", async () => {
    const prods = new Prod();
    prods.save({ name: "Juego1", price: 1000, thumbnail: "foto1" });
    assert.strictEqual((await prods.getAll()).length, 53);
  });

  it("Deberia eliminar por id un producto", async () => {
    const prods = new Prod();
    prods.deleteById("61b80c66b08d7b0ddcc69c5d")
    assert.strictEqual((await prods.getAll()).length, 52);
  });

  it("Deberia eliminar todos los productos", async () => {
    const prods = new Prod();
    prods.deleteAll()
    assert.strictEqual((await prods.getAll()).length, 0);
  });
});
