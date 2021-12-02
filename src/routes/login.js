const express = require("express")
const app = express()
const MongoStore = require("connect-mongo")
const session = require("express-session")
const advanceOptions = {useNewUrlparser: true, useUnifiedTopology: true}
const {Router} = express
const router = new Router()




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
  
router.get("/login",  (req, res) => {
    const user = req.query.name;
    console.log(user);
    req.session.users = user
    console.log(req.session);
    res.sendFile("/public/login.html", { root: "." });
  });
  
router.get("/logout", (req, res) => {
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
    res.send("ok")
  });


  module.exports = router