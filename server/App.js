const Koa = require("koa")
const koaBody = require("koa-body")

const app = new Koa()

//cookie
app.use(koaBody())

//normalizr
const Contenedor = require("./src/controllers/dao/daoChat");
const msnSchema = require("./src/models/MsnSchema");
const { normalize, schema, denormalize } = require("normalizr");

//Routes
const routerProd = require("./src/routes/products");
const routerLogin = require("./src/routes/login");
const routerChat = require("./src/routes/chat")
const routerProcess = require("./src/routes/processInfo")
const routerRandom = require("./src/routes/random")
const routerGraphql = require("./src/service/server")

//Passport
const MongoStore = require("connect-mongo");
const session = require("express-session");
const advanceOptions = { useNewUrlparser: true, useUnifiedTopology: true };
const passport = require("passport");


/* const cluster = require("cluster")
const CPUs = require("os").cpus().length
const { fork } = require("child_process") */

//compression
const compression = require('compression')

//winston
const {createLogger, format, transports} = require("winston")

//DotEnv
require("dotenv").config()


//yargs
/* const yargs = require('yargs/yargs')(process.argv.slice(2))


const args = yargs.default({
  PORT:"8080"
}).alias({
  p:'PORT'
}).argv */

require("./src/lib/passport")
const app = express();

// middlewares
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl:process.env.MONGO_URI || process.env.SERVER ,
        mongoOptions: advanceOptions,
      }),
      secret: "topSecret",
      cookie: { maxAge: 60000 },
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compression())

/* const logger = createLogger({
  transports:[
    new transports.Console({
      level: "verbose"
    })
  ]
}) */



// mount routess
app.use(routerProd.routes());
app.use(routerLogin.routes());
app.use(routerGraphql.routes())

//app.use("/api/chat", routerChat);
//app.use("/api/info", routerProcess);
//app.use("/api/random", routerRandom);


//  server
const PORT = process.env.PORT || 8081

//Server io
const server = http.createServer(app);
const io = require("socket.io")(server);


/* if (process.argv[2] === "FORK") {
  for (let i = 0; i < CPUs; i++) {
      cluster.fork();
  }
  cluster.on("exit", (work, code, signal)=>{
      console.log(`Process ${process.pid} died`);
      cluster.fork()
  })
}else{
  server.listen(PORT, () => {
    logger.log("info", `server is running on port ${PORT}`);
  });
} 
 */

server.listen(PORT, () => {
  console.log(("info", `server is running on port ${PORT}`));
});


module.exports = app
