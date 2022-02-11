const request = require("supertest")("http://localhost:8081");
const expect = require("chai").expect;

describe("Api get Productos", () => {
  it("Deberia retornar un estado 200", async () => {
    let response = await request.get("/api/productos/");
    expect(response.status).to.eql(200);
  });
});
