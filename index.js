const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app)
const io = require("socket.io")(server)
const PORT = process.env.PORT || 8080;
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;

const routerProd = require("./src/routes/products")
//const routerLog = require("./src/routes/login")


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//app.use("/", routerLog)
app.use("/", routerProd)


//normalizr
const Contenedor = require("./src/dao/daoChat")
const msnSchema = require("./src/Models/MsnSchema")
const { normalize, schema, denormalize } = require("normalizr");


let chat = new Contenedor()

app.get("/chat", (req, res)=>{
  res.sendFile("public/index.html", {root: "."})
  console.log(req.user);
})

io.on("connection" , (socket)=>{
  console.log("User connected", socket.id)
  const getChat = chat.getAll().then(res => socket.emit('server:msn', res))
  
  
  socket.on("client:msn", (data)=>{
    chat.save(data)
    const get = chat.getAll()
    get.then(res => socket.emit('server:msn', res))
  })

})

app.get("/chatNormalizr", async (req, res)=>{
  const getMns = await chat.getAll()
  const schemaAutor = new schema.Entity('author',{msnSchema}, {idAttribute: 'mail'})
  const mySchema = new schema.Array({
    author: schemaAutor
  })
  const normalizedChat = normalize(getMns[0], mySchema)
  const compressChat = JSON.stringify(normalizedChat).length
  const denormalizeChat = denormalize(normalizedChat.result, mySchema, normalizedChat.entities)
  const descompressChat = JSON.stringify(denormalizeChat).length
  console.log(compressChat, descompressChat);
  const compress = ((compressChat*100)/descompressChat)
  const totalCompress = (compress - 100).toFixed(2)
  
  res.send({normalizr: normalizedChat, porcentajeCompresion: `% ${totalCompress}`})
  
})



//session
const MongoStore = require("connect-mongo")
const session = require("express-session");
const advanceOptions = {useNewUrlparser: true, useUnifiedTopology: true}

const ContenedorUser = require("./src/dao/daoUser")

let users = new ContenedorUser()

app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://mat:fury8gb@cluster0.fpnkj.mongodb.net/ecommerce?retryWrites=true&w=majority",
    mongoOptions: advanceOptions
  }),
  secret: "topSecret",
  cookie: {maxAge: 60000},
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use('local-login', new LocalStrategy((username, password, done)=>{
  let usr = users.getAll().then(us => {
    return us.username === username
  })

  if(usr){
    done(null,  usr)
  }
  done(null, false)
}))

passport.serializeUser((user, done)=>{
  done(null, user.id)
})

passport.deserializeUser((id, done)=>{
  let usr = users.getById(id)
  done(null, usr.id)
})


passport.use("local-signup", new LocalStrategy({
  usernameField:  "username",
  passwordField: "password",
  passReqToCallback: true
},
(req, username, password)=>{
  let usr = users.getAll().then(us => {
    return us.username === username
  })
  if (user) {
    console.log("el usuario ya existe");
    return done(done, false)
  } else {
    let user = {
    username: username,
    passport: pass
    }
  users.save(user)
  res.send("Te registraste con exito")
  }
  return done()
  }
))


app.get("/login",  (req, res) => {
  res.sendFile("public/login.html", { root: "." });
});

app.post("/login", passport.authenticate("local-login", {
  successRedirect: "/chat",
  failureRedirect: "/login"
}))

app.get("/signup",  (req, res) => {
  res.sendFile("public/signup.html", { root: "." });
});

app.post("/signup", passport.authenticate("local-login", {
  successRedirect: "/login",
  failureRedirect: "/signup"
}))



app.get("/logout", (req, res) => {
  req.session.destroy((err)=>{
    if (err) {
      res.send("hay un error")
    } else {
      res.send(`Hasta luego ${req.session.users}`)
      function logout() {
        res.redirect(routerProd)
      }
      setTimeout(logout, 3000);
      return
    }
  })
  res.send("te deslogueaste con exito")
});


server.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`);
})
