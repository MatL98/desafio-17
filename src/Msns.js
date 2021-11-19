import mongoose from "mongoose";

const msnCollection = 'mensajes'

const MsnSchema = new mongoose.Schema({

  author: {
    id: {type: String, require: true},
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    age: {type: Number, require: true},
    alias: {type: String, require: true},
    avatar: {type: String, require: true}
  },
  text: {type: String, require: true}
})

export const msn = mongoose.model(msnCollection, MsnSchema)