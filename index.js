/* //Express
const express = require("express");
const app = express();
const http = require("http");
//Server io
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8080;
//cookie
const cookieParser = require("cookie-parser");
//normalizr
const Contenedor = require("./src/dao/daoChat");
const msnSchema = require("./src/Models/MsnSchema");
const { normalize, schema, denormalize } = require("normalizr");
//Routes
const routerProd = require("./src/routes/products");
const routerLog = require("./src/routes/login");

passport.use(
  "local-login",
  new LocalStrategy(async function (username, password, done) {
    let user = await users.getUser(username);
    console.log(user);

    if (user[0].username) {
      passport.serializeUser((user, done) => {
        done(null, user);
      });
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
      let usr = users.getAll().then((us) => {
        console.log(us);
      });

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
// middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", routerProd);
app.use("/", routerLog);

 app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(app.router);
});


let chat = new Contenedor();

// socket connection
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  const getChat = chat.getAll().then((res) => socket.emit("server:msn", res));

  socket.on("client:msn", (data) => {
    chat.save(data);
    const get = chat.getAll();
    get.then((res) => socket.emit("server:msn", res));
  });
});

// route mount
app.get("/chat", (req, res) => {
   passport.deserializeUser((user, done)=>{
    //let users = users.getUser(user)
    done(null, user.username)
  }) 
});

app.get("/chatNormalizr", async (req, res) => {
  const getMns = await chat.getAll();
  const schemaAutor = new schema.Entity(
    "author",
    { msnSchema },
    { idAttribute: "mail" }
  );

  // Normalize data
  const mySchema = new schema.Array({
    author: schemaAutor,
  });
  const normalizedChat = normalize(getMns[0], mySchema);
  const compressChat = JSON.stringify(normalizedChat).length;
  const denormalizeChat = denormalize(
    normalizedChat.result,
    mySchema,
    normalizedChat.entities
  );
  const descompressChat = JSON.stringify(denormalizeChat).length;
  console.log(compressChat, descompressChat);
  const compress = (compressChat * 100) / descompressChat;
  const totalCompress = (compress - 100).toFixed(2);

  res.send({
    normalizr: normalizedChat,
    porcentajeCompresion: `% ${totalCompress}`,
  });
});

 */
