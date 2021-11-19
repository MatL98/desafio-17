const express = require("express");
const app = express();
const faker = require("faker");
const PORT = 8080;
//import mongoose from 'mongoose'

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoON();
async function mongoON() {
  try {
    const url = "mongodb://localhost:27017/ecommerce";
    let mongo = await mongoose.connect(url, {
      userNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base conectada");
  } catch (error) {
    error;
  }
}

const products = [];
for (let i = 0; i < 5; i++) {
  const product = {
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.technics(),
  };
  products.push(product);
}

app.get("/api/productos-test", (req, res) => {
  res.send(products);
});
app.get("/api/mensajes", (req, res) => {
  res.sendFile("public/index.html", { root: "." });
});

app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
