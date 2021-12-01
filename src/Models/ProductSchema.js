const {Schema, model} = require("mongoose");

const prodCollection = 'productos'

const ProdSchema = new Schema({

    id: {type: String, require: true},
    name: {type: String, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true}
  
})

module.exports = model(prodCollection, ProdSchema)