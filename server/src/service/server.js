import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
const Router = require("koa-router")
const router = new Router({
  prefix: "/api/users",
});
const Contenedor = require("../controllers/dao/daoUser");
const user = new Contenedor();

const schema = buildSchema(`
    type User{
        id: String,
        username: String
        password: String
    }
    
    input UserInput {
        username: String
        password: String
    }
    type Query{
        getUser(id):Persona,
        getUsers(username: String) : [User]
    }

    type Mutation{
        createUser(data: UserInput): User
        updateUser(id: id, data: UserInput):User
        deleteUser(id: id): User
    }

`);

async function getUser({ id }) {
  const datos = await user.getUser(id);
  return datos;
}
async function getUsers() {
  const datos = await user.getAll();
  return datos;
}
async function createUser({ data }) {
  const datos = await user.save(data);
  return datos;
}
async function updateUser({ data }) {
  const datos = await user.update(data);
  return datos;
}
async function deleteUser({ id }) {
  const datos = await user.delete(id);
  return datos;
}

router.use(
  "/", ctx =>{
		graphqlHTTP({
			schema: schema,
			rootValue: {
				getUser,
				getUsers,
				createUser,
				updateUser,
				deleteUser,
			},
			graphiql: true,
		})
	}
);

module.exports = router;
