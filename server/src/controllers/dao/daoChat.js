const ContenedorMongo = require ("../container/ContainerMongo")

class ChatDaoMongo extends ContenedorMongo {

    constructor() {
        super('chat')
    }
}

module.exports = ChatDaoMongo