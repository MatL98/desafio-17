const CustomError = require("../../lib/CustomError");
require("../service/db");

class DaoLogic {
  async getAll() {
    throw new CustomError(500, "error left getAll");
  }
  async getById(id) {
    throw new CustomError(500, "error left getById");
  }
  async save(newObject) {
    throw new CustomError(500, "error left save");
  }
  async delete() {
    throw new CustomError(500, "error left getAll");
  }
  async deleteById(id) {
    throw new CustomError(500, "error left getAll");
  }
  async update(id, newObj) {
    throw new CustomError(500, "error left getAll");
  }
}

module.exports = DaoLogic
