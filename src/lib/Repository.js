const DaoLogic = require("../controllers/dao/DaoLogic");

class Repository {
  constructor() {
    this.prod = new DaoLogic();
  }
  async getProds() {
    let prods = await this.prod.getAll();
    return prods;
  }
}
