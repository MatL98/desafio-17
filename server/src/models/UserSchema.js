const {Schema, model} = require("mongoose");

const userCollection = 'users'

const userSchema = new Schema({

    id: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true}
})

module.exports = model(userCollection, userSchema)