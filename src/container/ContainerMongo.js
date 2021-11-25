
require("../db")

const Msn = require("../MsnSchema")

class ContainerMongo {
  constructor() {
  }

  async getById(id) {
    try {
      const docs = await Msn.find({ _id: id });
      if (docs.length == 0) {
        throw new Error("Error al listar por id: no encontrado");
      } else {
        const result = docs
        return result;
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`);
    }
  }
  async getAll() {
    try {
      let docs = await Msn.find({}, { __v: 0 }).lean();
      return docs;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async save(nuevoElem) {
    try {
      let doc = await Msn.create(nuevoElem);
      return doc;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(nuevoElem) {
    try {
      const { n, nModified } = await Msn.replaceOne(
        { _id: nuevoElem._id },
        nuevoElem
      );
      if (n == 0 || nModified == 0) {
        throw new Error("Error al actualizar: no encontrado");
      } else {
        return (nuevoElem);
      }
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const { n, nDeleted } = await Msn.deleteOne({ _id: id });
      if (n == 0 || nDeleted == 0) {
        throw new Error("Error al borrar: no encontrado");
      }
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await Msn.deleteMany({});
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}
module.exports = ContainerMongo;
