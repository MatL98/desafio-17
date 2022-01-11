require("../db");

const Msn = require("../Models/MsnSchema");
const Prod = require("../Models/ProductSchema");
const User = require("../Models/UserSchema");

class ContainerMongo {
  constructor(collection) {
    if (collection === "prod") {
      this.collection = Prod;
    } else if (collection === "chat") {
      this.collection = Msn;
    } else {
      this.collection = User;
    }
  }

  async getUser(username) {
    try {
      const user = await this.collection.find({ username: username });
      if (!user) {
        throw new Error("Error al listar por id: no encontrado");
      } else {
        return user;
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }

  async getAll() {
    try {
      let docs = await this.collection.find({}, { __v: 0 }).lean();
      return docs;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(nuevoElem) {
    try {
      let doc = await this.collection.create(nuevoElem);
      return doc;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(nuevoElem) {
    try {
      const { n, nModified } = await this.collection.replaceOne(
        { _id: nuevoElem._id },
        nuevoElem
      );
      if (n == 0 || nModified == 0) {
        throw new Error("Error al actualizar: no encontrado");
      } else {
        return nuevoElem;
      }
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const user = await this.collection.deleteOne({ _id: id });
      if (!user) {
        throw new Error("Error al borrar: no encontrado");
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}
module.exports = ContainerMongo;
