const DaoLogic = require("../controllers/dao/DaoLogic");

class CrudLogic {
  constructor() {
    this.daoLogic = new DaoLogic();
  }

  async save(newObject) {
    let savedObj = this.daoLogic.save(newObject);
    return savedObj;
  }
  async search(id) {
    let obj;
    if (id) {
      obj = await this.daoLogic.getById(id);
    } else {
      obj = await this.daoLogic.getById(id);
    }
    return obj;
  }
  async update(id, newObjt) {
    let objUpdate = await this.daoLogic.update(id, newObjt);
    return objUpdate;
  }
  async delete(id) {
    if (id) {
      await this.daoLogic.deleteById(id);
    } else {
      await this.daoLogic.delete();
    }
  }
}

module.exports = CrudLogic
