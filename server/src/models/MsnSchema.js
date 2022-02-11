const {Schema, model} = require("mongoose");

const msnCollection = 'mensajes'

const MsnSchema = new Schema({

  author:{
    id: {type: String, require: true},
    mail: {type: String, require: true},
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    age: {type: Number, require: true},
    alias: {type: String, require: true},
    avatar: {type: String, require: true}
  },
  msn: {type: String, require: true}
  
})

module.exports = model(msnCollection, MsnSchema)


