const minimist = require("minimist")
const CrudLogic = require("./src/service/services")

const crudLogic = new CrudLogic()

async function startCdms() {
    const argv = minimist(process.argv.slice(2))
    const {cdm, id, name, price, thumbnail, username, password} = argv
    try{
        switch (cdm.toLowerCase()) {
            case "search":
                console.log(await crudLogic.search(id));
                break;
            case "add":
                console.log(await crudLogic.save({name, price, thumbnail}));
                break;
            case "replace":
                console.log(await crudLogic.update(id));
                break;
            case "delete":
                console.log(await crudLogic.delete(id));
                break;
        
            default:
							console.log("comando no valido");
        }
    }catch(error){
			throw error
		}
}
startCdms()