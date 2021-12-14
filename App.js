const express = require("express");
const http = require("http");

//cookie
const cookieParser = require("cookie-parser");

//normalizr
const Contenedor = require("./src/dao/daoChat");
const msnSchema = require("./src/Models/MsnSchema");
const { normalize, schema, denormalize } = require("normalizr");

//Routes
const routerProd = require("./src/routes/products");
const routerLogin = require("./src/routes/login");
const routerChat = require("./src/routes/chat")
const routerProcess = require("./src/routes/processInfo")
const routerRandom = require("./src/routes/random")

//Passport
const MongoStore = require("connect-mongo");
const session = require("express-session");
const advanceOptions = { useNewUrlparser: true, useUnifiedTopology: true };
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { fork } = require("child_process")

//DotEnv
const dotenv = require("dotenv")
dotenv.config()

//yargs
const yargs = require('yargs/yargs')(process.argv.slice(2))

const args = yargs.default({
  PORT:"8080"
}).alias({
  p:'PORT'
}).argv


const app = express();

// middlewares
  app.use(express.static(__dirname + "/public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
          "mongodb+srv://mat:fury8gb@cluster0.fpnkj.mongodb.net/ecommerce?retryWrites=true&w=majority",
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


const ContenedorUser = require("./src/dao/daoUser");
let users = new ContenedorUser();


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done)=>{
  let usr = users.getUser(user)
  done(null, usr.username)
}) 


passport.use(
  "local-login",
  new LocalStrategy(async function (username, password, done) {
    let user = await users.getUser(username);
   
    if (user[0].username) {
      return done(null, user);
    }
    return done(null, false);
  })
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
          let us = users.getAll().then((us)=>{
            us.map((u)=>{
            let usr = u.username
            return usr
          })
        })

        
      if (usr.username) {
        console.log("el usuario ya existe");
        return done(done, false);
      } else {
        let user = {
          username: username,
          password: password,
        };
        users.save(user);
        console.log("Usario creado!");
      }
      return done();
    }
  )
);

app.get("/api/random", (req, res)=>{
  const numbers = req.query.cant
  let getNum = fork("./src/getRandom.js")
  if(numbers){
    getNum.send(numbers)
  }else{
    getNum.send(0)
  }
  getNum.on("message", (random)=>{
    res.send({claves: random})
  })
}) 

// mount routess
app.use("/api/productos", routerProd);
app.use("/api/auth", routerLogin);
app.use("/api/chat", routerChat);
app.use("/api/info", routerProcess);
//app.use("/api/random", routerRandom);



//  server
const PORT = args.p || args.PORT

//Server io
const server = http.createServer(app);
const io = require("socket.io")(server);


server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

module.exports = app
