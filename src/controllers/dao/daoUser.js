const ContenedorMongo = require ("../container/ContainerMongo")

class UserDaoMongo extends ContenedorMongo {

    constructor() {
        super('users')
    }
}

module.exports = UserDaoMongo