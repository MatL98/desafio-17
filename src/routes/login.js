const express = require("express");
const passport = require("passport");
const ContenedorUser = require("../dao/daoUser");


const { Router } = express;
const router = new Router();


let users = new ContenedorUser();


router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/chat.html",
    failureRedirect: "/login.html",
  })
);


router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/login.html",
    failureRedirect: "/signup.html",
  })
);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("hay un error");
    } else {
      res.send(`Hasta luego ${req.session.users}`);
      function logout() {
        res.redirect(routerProd);
      }
      setTimeout(logout, 3000);
      return;
    }
  });
  res.send("te deslogueaste con exito");
});

module.exports = router;
