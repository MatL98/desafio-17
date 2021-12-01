const ContenedorMongo = require ("../container/ContainerMongo")

class ProdDaoMongo extends ContenedorMongo {

    constructor() {
        super('prod')
    }
}

module.exports = ProdDaoMongo